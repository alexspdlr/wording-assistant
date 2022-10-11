import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import {
  ClientActionEvent_Extended,
  ClientActionPayload_StartWorker,
  PuppeteerError,
  PuppetState,
  ServerResponseEvent_Extended,
} from '../../types';
import updateTargetText from './clientActionEvents/updateTargetText';
import deselectText from './clientActionEvents/deselectText';
import exit from './otherEvents/exit';
import moveCursor from './clientActionEvents/moveCursor';
import selectText from './clientActionEvents/selectText';
import start from './otherEvents/start';
import selectWordingAlternative from './clientActionEvents/selectWordingAlternative';
import { EventManager } from '../EventManager/EventManager';
import {
  ActiveWorkerState,
  ClientActionPayload,
  ClientActionPayload_MoveCursor,
  ClientActionPayload_SelectText,
  ClientActionPayload_SelectWordingAlternative,
  ClientActionPayload_UpdateTargetText,
} from '../../types/socket';
import generateDefaultWorkerState from '../ServerSocket/util/generateDefaultWorkerState';
import handleError from './otherEvents/handleError';

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
      await start(
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_StartWorker).workerId
      );
      return;

    case 'selectText':
      await selectText(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_SelectText).originalText,
        (event.payload as ClientActionPayload_SelectText).sourceSelectionStart,
        (event.payload as ClientActionPayload_SelectText).sourceSelectionEnd
      );

      return;
    case 'deselectText':
      await deselectText(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet
      );

      return;

    case 'moveCursor':
      await moveCursor(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_MoveCursor).newCursorIndex
      );
      return;

    case 'updateTargetText':
      await updateTargetText(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_UpdateTargetText).newTargetText
      );
      return;

    case 'selectWordingAlternative':
      await selectWordingAlternative(
        (event.payload as ClientActionPayload).eventId,
        localState,
        updateLocalState,
        respondToPuppet,
        (event.payload as ClientActionPayload_SelectWordingAlternative)
          .selectedAlternativeIndex
      );
      return;

    case 'terminateWorker':
      await exit(localState, updateLocalState, respondToPuppet);
      return;
    default:
      return;
  }
};

/* ---------------------------------- STATE --------------------------------- */

// TODO: ADD EVENT MANAGER, CONVERT COMMUNICATION TO PARENT WITH _Extended Types & update rest

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
