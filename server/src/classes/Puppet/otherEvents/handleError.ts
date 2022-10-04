import puppeteer_reset_page from '../../../operations/resetPage';
import {
  PuppeteerError,
  PuppetState,
  ServerResponseEvent_Extended,
} from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';

const handleError = async (
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  error: PuppeteerError
) => {
  if (localState.page && localState.browser) {
    /* -------------------------------------------------------------------------- */
    /*                                    START                                   */
    /* -------------------------------------------------------------------------- */

    console.log(`ERROR (${error.location}): ${error.message}`);

    // CREATE NEW WORKER STATE & RESPONSE
    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingError',
      data: {
        ...localState.workerState.data,
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'processingErrorStarted',
      workerState: newWorkerState_Start,
    };

    // UPDATE LOCAL STATE & RESPOND
    updateLocalState(newWorkerState_Start);

    respondToPuppet(response_Start);

    /* -------------------------------------------------------------------------- */
    /*                                   FINISH                                   */
    /* -------------------------------------------------------------------------- */

    // ACTION
    await puppeteer_reset_page(localState.page, localState.browser);

    // CREATE NEW WORKER STATE & RESPONSE
    const newWorkerState_Finish: ActiveWorkerState = {
      stateName: 'waitingForSelectText',
      data: {
        id: localState.workerState.data.id,
        inputText: null,
        targetText: null,
        cursorIndex: 0,
        rephrasingOptions: [],
      },
    };

    const response_Finish: ServerResponseEvent_Extended = {
      endpoint: 'processingErrorCompleted',
      workerState: newWorkerState_Finish,
    };

    // UPDATE LOCAL STATE & RESPOND
    updateLocalState(newWorkerState_Finish);

    respondToPuppet(response_Finish);
  }
};

export default handleError;
