import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import puppeteer_setup from '../../operations/setup';
import puppeteer_select_text from '../../operations/selectText';
import { DispatchableEvent, ReceivableEvent } from '../../types';

interface PuppetWorkerState {
  page: Page | null;
  browser: Browser | null;
}

const localState: PuppetWorkerState = {
  page: null,
  browser: null,
};

parentPort?.on('message', async (event: DispatchableEvent) => {
  const response = await processEvent(event);

  if (response) {
    parentPort?.postMessage(response);
  }
});

const processEvent = async (
  event: any
): Promise<ReceivableEvent | undefined> => {
  switch (event.command) {
    case 'START_PUPPET':
      return await start(event.payload.id);

    case 'SELECT_TEXT':
      return await selectText(event.payload.inputText);

    case 'EXIT_PUPPET':
      return await exit();
    default:
      return;
  }
};

const start = async (id: number) => {
  const { page, browser } = await puppeteer_setup();

  localState.page = page;
  localState.browser = browser;

  const response: ReceivableEvent = {
    code: 'PUPPET_START_COMPLETED',
    payload: {
      id,
    },
  };

  return response;
};

const exit = async () => {
  await localState.browser?.close();

  const response: ReceivableEvent = {
    code: 'PUPPET_EXIT_COMPLETED',
    payload: {},
  };

  return response;
};

const selectText = async (inputText: string) => {
  if (localState.page) {
    const result = await puppeteer_select_text(inputText, localState.page);

    const response: ReceivableEvent = {
      code: 'PUPPET_SELECT_TEXT_COMPLETED',
      payload: {
        rephrasingBase: result,
      },
    };

    return response;
  }
};
