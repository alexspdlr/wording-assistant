import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import {
  DispatchableEvent,
  DispatchableEventPayload_SelectText,
  DispatchableEventPayload_StartPuppet,
  PuppetWorkerState,
  ReceivableEventPuppet,
} from '../../types';
import exit from './dispatchableEvents/exit';
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

const respondToPuppet = (response: ReceivableEventPuppet) =>
  parentPort?.postMessage(response);

/* ------------------------------ HANDLE EVENTS ----------------------------- */

const processEvent = async (event: DispatchableEvent) => {
  switch (event.command) {
    case 'START_PUPPET':
      await start(
        (event.payload as DispatchableEventPayload_StartPuppet).id,
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
    case 'EXIT_PUPPET':
      await exit(localState, respondToPuppet);
      return;
    default:
      return;
  }
};
