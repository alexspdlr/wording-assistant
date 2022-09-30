import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import {
  DispatchableEvent,
  DispatchableEventPayload_MoveCursor,
  DispatchableEventPayload_SelectText,
  DispatchableEventPayload_Start,
  PuppetWorkerState,
  ReceivableEventWorker,
} from '../../types';
import deselectText from './dispatchableEvents/deselectText';
import exit from './dispatchableEvents/exit';
import moveCursor from './dispatchableEvents/moveCursor';
import selectText from './dispatchableEvents/selectText';
import start from './dispatchableEvents/start';

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
  processEvent(event)
);

const respondToPuppet = (response: ReceivableEventWorker) =>
  parentPort?.postMessage(response);

/* ------------------------------ HANDLE EVENTS ----------------------------- */

const processEvent = async (event: DispatchableEvent) => {
  console.log('EVENT COMMAND: ', event.command);

  switch (event.command) {
    case 'START':
      await start(
        (event.payload as DispatchableEventPayload_Start).id,
        updateLocalState,
        respondToPuppet
      );

      return;

    case 'SELECT_TEXT':
      // if -->  await resetPage(page, browser);
      await selectText(
        (event.payload as DispatchableEventPayload_SelectText).inputText,
        localState,
        respondToPuppet
      );

      return;
    case 'DESELECT_TEXT':
      // if -->  await resetPage(page, browser);
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

    case 'EXIT':
      await exit(localState, respondToPuppet);
      return;
    default:
      return;
  }
};
