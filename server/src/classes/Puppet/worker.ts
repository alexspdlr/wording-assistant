import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import setup from '../../operations/setup';
import { PuppetAction } from './types';

parentPort?.on('message', async (action: PuppetAction) => {
  const response = await executeAction(action);

  if (response) {
    parentPort?.postMessage(response);
  }
});

console.info('Spawned a PUPPET_WORKER');

interface PuppetWorkerState {
  page: Page | null;
  browser: Browser | null;
}

let localState: PuppetWorkerState = {
  page: null,
  browser: null,
};

const executeAction = async (action: PuppetAction): Promise<any> => {
  switch (action.command) {
    case 'OTHER':
      // code block
      return;

    case 'START':
      const response = await start(action.payload.id);
      return response;
    case 'EXIT':
      // code block
      break;
    default:
      return;
  }
};

const start = async (id: number) => {
  const { page, browser } = await setup();

  localState.page = page;
  localState.browser = browser;

  if (page && browser) {
    console.log(`Started PUPPET_WORKER with id: ${id}`);
    return true;
  }

  return false;
};

/*
import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import setup from './operations/setup';

let setup1: {
  page: Page;
  browser: Browser;
};

const spawnPuppet = async () => {
  setup1 = await setup();
};

parentPort?.on('message', async (message) => {
  if (message === 'SPAWN') {
    await spawnPuppet();
    log('puppet spawned');
  }
});

parentPort?.on('close', async () => {
  await setup1.browser.close(); 

  log('puppet killed');
});

const log = (msg: string) => {
  console.log(msg);
};
*/
