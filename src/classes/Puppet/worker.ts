import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import {
  ClientActionEvent_Extended,
  ClientActionPayload_StartWorker,
  PuppetState,
  ServerResponseEvent_Extended,
} from '../../types';
import {
  ActiveWorkerState,
  ClientActionPayload,
  ClientActionPayload_moveCaret,
  ClientActionPayload_SelectText,
  ClientActionPayload_SelectWordingAlternative,
  ClientActionPayload_UpdateTargetText,
} from '../../types/socket';
import { EventManager } from '../EventManager/EventManager';
import generateDefaultWorkerState from '../ServerSocket/util/generateDefaultWorkerState';
import handleDeselectText from './clientActionEvents/handleDeselectText';
import handleMoveCaret from './clientActionEvents/handleMoveCaret';
import handleSelectText from './clientActionEvents/handleSelectText';
import handleSelectWordingAlternative from './clientActionEvents/handleSelectWordingAlternative';
import handleUpdateTargetText from './clientActionEvents/handleUpdateTargetText';
import handleExit from './otherEvents/handleExit';
import handleStart from './otherEvents/handleStart';

/**
 *
 *  The worker thread of a puppet:
 *
 *    - receives client-action-events from the puppet object, which are then executed by puppeteer
 *
 *    - maintains a local state, which some puppeteer-actions must access
 *
 *    - returns a server-response-event to the parent thread after execution of a received client-action-event
 *
 */

/* ----------------------- CROSS THREAD COMMUNICATION ----------------------- */

parentPort?.on('message', async (event: ClientActionEvent_Extended) =>
  localState.eventManager.handleNewEvent(event)
);

const respondToPuppet = (response: ServerResponseEvent_Extended) =>
  parentPort?.postMessage(response);

/* ------------------------------ HANDLE EVENTS ----------------------------- */

const processEvent = async (event: ClientActionEvent_Extended) => {
  switch (event.endpoint) {
    case 'startWorker':
      await handleStart(
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_StartWorker).workerId
      );
      return;

    case 'selectText':
      await handleSelectText(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_SelectText).newTextSelection
      );

      return;
    case 'deselectText':
      await handleDeselectText(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet
      );

      return;

    case 'moveCaret':
      await handleMoveCaret(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_moveCaret).newCaretIndex
      );
      return;

    case 'updateTargetText':
      await handleUpdateTargetText(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_UpdateTargetText)
          .newActiveTextSelection
      );
      return;

    case 'selectWordingAlternative':
      await handleSelectWordingAlternative(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_SelectWordingAlternative)
          .selectedAlternativeIndex,
        (event.payload as ClientActionPayload_SelectWordingAlternative)
          .selectedAlternativeValue
      );
      return;

    case 'terminateWorker':
      await handleExit(localState, updateLocalState, respondToPuppet);
      return;
    default:
      return;
  }
};

/* ---------------------------------- STATE --------------------------------- */

const localState: PuppetState = {
  page: null,
  browser: null,
  eventManager: new EventManager(processEvent, () => localState.workerState),
  workerState: generateDefaultWorkerState('start'),
};

const updateLocalState = (
  workerState: ActiveWorkerState,
  page?: Page,
  browser?: Browser
) => {
  if (page) localState.page = page;
  if (browser) localState.browser = browser;
  localState.workerState = workerState;
  return;
};
