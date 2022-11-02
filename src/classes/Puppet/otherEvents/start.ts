import { Browser, Page } from 'puppeteer';
import puppeteer_setup from '../../../operations/setup';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';

import { ActiveWorkerState } from '../../../types/socket';

const start = async (
  localState: PuppetState,
  updateLocalState: (
    workerState: ActiveWorkerState,
    page: Page | undefined,
    browser: Browser | undefined
  ) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  id: string
) => {
  // ACTION
  const { page, browser } = await puppeteer_setup();

  // CREATE NEW WORKER STATE & RESPONSE
  const newWorkerState: ActiveWorkerState = {
    stateName: 'waitingForSelectText',
    data: {
      ...localState.workerState.data,
      id,
    },
  };

  const response: ServerResponseEvent_Extended = {
    endpoint: 'setupCompleted',
    payload: {
      eventId: '',
      workerState: newWorkerState,
    },
  };

  // UPDATE LOCAL STATE & RESPOND
  updateLocalState(newWorkerState, page, browser);

  respondToPuppet(response);
};
export default start;
