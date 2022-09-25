import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import setup from '../../operations/setup';
import { PuppetAction, PuppetWorkerResponse } from './types';

interface PuppetWorkerState {
  page: Page | null;
  browser: Browser | null;
}

let localState: PuppetWorkerState = {
  page: null,
  browser: null,
};

parentPort?.on('message', async (action: PuppetAction) => {
  const response = await executeAction(action);

  if (response) {
    parentPort?.postMessage(response);
  }
});

console.info('Spawned a PUPPET_WORKER');

const executeAction = async (
  action: PuppetAction
): Promise<PuppetWorkerResponse | undefined> => {
  switch (action.command) {
    case 'OTHER':
      // code block
      return;

    case 'START':
      const startResponse = await start(action.payload.id);
      return startResponse;
    case 'EXIT':
      // code block
      const exitResponse = await exit();
      return exitResponse;
    default:
      return;
  }
};

const start = async (id: number) => {
  const { page, browser } = await setup();

  localState.page = page;
  localState.browser = browser;

  const response: PuppetWorkerResponse = {
    code: 'START_COMPLETED',
    payload: {
      id,
    },
  };

  return response;
};

const exit = async () => {
  console.log(`Exit PUPPET_WORKER`);

  await localState.browser?.close();

  // parentPort?.close();

  const response: PuppetWorkerResponse = {
    code: 'EXIT_COMPLETED',
    payload: {},
  };

  return response;
};
