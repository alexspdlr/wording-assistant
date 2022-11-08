import { Browser, Page } from 'puppeteer';
import puppeteer_setup from '../../../operations/setup';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';

/**
 * The function is triggered when the connection to a socket is established and:
 *
 *   - sets up an associated browser controlled by puppeteer
 *
 *   - forms and returns a server-response-event with information about the new state of the puppet-worker AFTER the setting up an associated browser
 *
 * @param localState
 * @param updateLocalState
 * @param respondToPuppet
 * @param id
 */

const handleStart = async (
  localState: PuppetState,
  updateLocalState: (
    workerState: ActiveWorkerState,
    page: Page | undefined,
    browser: Browser | undefined
  ) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  id: string
) => {
  /* --------------------------- Set up the browser --------------------------- */
  const { page, browser } = await puppeteer_setup();

  /* ---------------------- After setting up the browser ---------------------- */
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

  updateLocalState(newWorkerState, page, browser);

  respondToPuppet(response);
};
export default handleStart;
