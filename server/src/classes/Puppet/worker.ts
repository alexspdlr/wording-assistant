import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import {
  DispatchableEvent,
  DispatchableEventPayload_MoveCursor,
  DispatchableEventPayload_SelectText,
  DispatchableEventPayload_SelectWordingAlternative,
  DispatchableEventPayload_Start,
  DispatchableEventPayload_UpdateTargetText,
  PuppetWorkerState,
  ReceivableEventWorker,
} from '../../types';
import updateTargetText from './dispatchableEvents/updateTargetText';
import deselectText from './dispatchableEvents/deselectText';
import exit from './dispatchableEvents/exit';
import moveCursor from './dispatchableEvents/moveCursor';
import selectText from './dispatchableEvents/selectText';
import start from './dispatchableEvents/start';
import selectWordingAlternative from './dispatchableEvents/selectWordingAlternative';

/* ---------------------------------- STATE --------------------------------- */

const localState: PuppetWorkerState = {
  page: null,
  browser: null,
};

const updateLocalState = (page?: Page, browser?: Browser) => {
  if (page) localState.page = page;
  if (browser) localState.browser = browser;
};

/* ----------------------- CROSS THREAD COMMUNICATION ----------------------- */

parentPort?.on('message', async (event: DispatchableEvent) =>
  /* -------------------------------------------------------------------------- */
  /*                                EVENT MANAGER                               */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                              EVENT MANAGER END                             */
  /* -------------------------------------------------------------------------- */

  processEvent(event)
);

const respondToPuppet = (response: ReceivableEventWorker) =>
  parentPort?.postMessage(response);

/* ------------------------------ HANDLE EVENTS ----------------------------- */

const processEvent = async (event: DispatchableEvent) => {
  switch (event.command) {
    case 'START':
      await start(
        (event.payload as DispatchableEventPayload_Start).id,
        updateLocalState,
        respondToPuppet
      );

      return;

    case 'SELECT_TEXT':
      await selectText(
        (event.payload as DispatchableEventPayload_SelectText).inputText,
        localState,
        respondToPuppet
      );

      return;
    case 'DESELECT_TEXT':
      await deselectText(
        (event.payload as DispatchableEventPayload_SelectText).inputText,
        localState,
        respondToPuppet
      );

      return;

    case 'MOVE_CURSOR':
      await moveCursor(
        (event.payload as DispatchableEventPayload_MoveCursor).newCursorIndex,
        localState,
        respondToPuppet
      );
      return;

    case 'UPDATE_TARGET_TEXT':
      await updateTargetText(
        (event.payload as DispatchableEventPayload_UpdateTargetText)
          .postChangeCursorIndex,
        (event.payload as DispatchableEventPayload_UpdateTargetText)
          .newTargetText,
        localState,
        respondToPuppet
      );
      return;

    case 'SELECT_WORDING_ALTERNATIVE':
      await selectWordingAlternative(
        (event.payload as DispatchableEventPayload_SelectWordingAlternative)
          .selectedAlternativeIndex,
        localState,
        respondToPuppet
      );
      return;

    case 'EXIT':
      await exit(localState, respondToPuppet);
      return;
    default:
      return;
  }
};
