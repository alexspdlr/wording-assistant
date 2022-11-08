import puppeteer_reset_page from '../../../operations/resetPage';
import {
  PuppeteerError,
  PuppetState,
  ServerResponseEvent_Extended,
} from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';

/**
 * The function is triggered when an error occurs and:
 *
 *   - forms and returns a server-response-event with information about the "processing Error"-state of the puppet-worker
 *
 *   - resets the page to its initial state
 *
 *   - forms and returns a server-response-event with information about the new state of the puppet-worker AFTER the reset
 *
 * @param eventId
 * @param localState
 * @param updateLocalState
 * @param respondToPuppet
 * @param error
 */

const handleError = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  error: PuppeteerError
) => {
  if (localState.page && localState.browser) {
    /* ---------------------------- Before resetting ---------------------------- */

    console.log(`ERROR (${error.location}): ${error.message}`);

    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingError',
      data: {
        ...localState.workerState.data,
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'processingErrorStarted',
      payload: {
        eventId,
        workerState: newWorkerState_Start,
      },
    };

    updateLocalState(newWorkerState_Start);

    respondToPuppet(response_Start);

    /* ------------------------------- Reset Page ------------------------------- */

    await puppeteer_reset_page(localState.page);

    /* ----------------------------- After resetting ---------------------------- */

    const newWorkerState_Finish: ActiveWorkerState = {
      stateName: 'waitingForSelectText',
      data: {
        id: localState.workerState.data.id,
        originalTextSelection: null,
        activeTextSelection: null,
        caretIndex: 0,
        rephrasingOptions: [],
      },
    };

    const response_Finish: ServerResponseEvent_Extended = {
      endpoint: 'processingErrorCompleted',
      payload: {
        eventId,
        workerState: newWorkerState_Finish,
      },
    };

    updateLocalState(newWorkerState_Finish);

    respondToPuppet(response_Finish);
  }
};

export default handleError;
