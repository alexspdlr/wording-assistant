import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import puppeteer_setup from '../../operations/setup';
import puppeteer_select_text from '../../operations/selectText';
import {
  PuppetDispatchableEvent,
  PuppetReceivableEvent,
} from '../../types/puppet';

interface PuppetWorkerState {
  page: Page | null;
  browser: Browser | null;
}

const localState: PuppetWorkerState = {
  page: null,
  browser: null,
};

parentPort?.on('message', async (event: any) => {
  // TODO: fix this weird typescript error: https://www.typescriptlang.org/play?#code/FAegVMAOBOD2BGAbApgWwFwAJjAC4E9JlMBxZAO2WgENEBhWVVa8gE0wF5MBBTAH0wAhfpjo4AluVxUAZtQDGxXgG9gmTPMbM2WAETddAbjWZI1fIljVWWVevUxYkblnIBXVPCrH1AX2O+ElKyCsTCdhpaLDaYuoJGJmYWVjERDnCQglgAzrjQkgDmPpj+wIHAktLQcoqimBGaTNF6dAkO5pbWtqXlJprkuZiWBQxNbJyY1Nn45PKYABTyqDFklDT0UWwAlJwAfPU46v2DlADudMuYWKtUtKPa7FxpkWMxS6wAdI0PADQm7ckuhplh8kp1WCZAtgjrABrAUB9hvMzhdWFtDNgyjgwCAcCAQJhsvC3LhxLCsDgCERSBRbhtXhNeAJhAIxNhKiFaio+psYvo2qYOilbP9TBkXJh3J5vJCAkEqjUwgcYa89PFimDhcr7I5Mjk8oVij15ZziHRtd9mrFWhqhUDlMbDpEBrghrARryJlMZnNFstrrT1vdojsOPtVKKUK75FNpKxURinepsqdxLh5AALP2fS3bZ5HKbEfkU+yljSx5Dxy5cd6TbI8UX2GPZIvxEtlgu5Suoia1qZCJOl5tF1rtjvNuM9muXfts+zlGEuyXIc6XANrO6ep6i3NvCtVnO8v6lzVAifdkGniF+NQ8uEIpEo5bozG+IA

  const response = await processEvent(event);

  if (response) {
    parentPort?.postMessage(response);
  }
});

const processEvent = async (
  event: any
): Promise<PuppetReceivableEvent | undefined> => {
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

  const response: PuppetReceivableEvent = {
    code: 'PUPPET_START_COMPLETED',
    payload: {
      id,
    },
  };

  return response;
};

const exit = async () => {
  await localState.browser?.close();

  const response: PuppetReceivableEvent = {
    code: 'PUPPET_EXIT_COMPLETED',
    payload: {},
  };

  return response;
};

const selectText = async (inputText: string) => {
  if (localState.page) {
    const result = await puppeteer_select_text(inputText, localState.page);

    const response: PuppetReceivableEvent = {
      code: 'PUPPET_SELECT_TEXT_COMPLETED',
      payload: {
        rephrasingBase: result,
      },
    };

    return response;
  }
};
