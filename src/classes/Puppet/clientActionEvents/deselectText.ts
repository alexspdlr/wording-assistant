import puppeteer_reset_page from '../../../operations/resetPage';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';
import generateDefaultWorkerState from '../../ServerSocket/util/generateDefaultWorkerState';

const deselectText = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void
) => {
  if (localState.page && localState.browser) {
    /* -------------------------------------------------------------------------- */
    /*                                    START                                   */
    /* -------------------------------------------------------------------------- */

    // CREATE NEW WORKER STATE & RESPONSE
    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingDeselectText',
      data: {
        id: localState.workerState.data.id,
        originalTextSelection: null,
        activeTextSelection: null,
        cursorIndex: 0,
        rephrasingOptions: [],
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'deselectTextStarted',
      payload: {
        eventId,
        workerState: newWorkerState_Start,
      },
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
        originalTextSelection: null,
        activeTextSelection: null,
        cursorIndex: 0,
        rephrasingOptions: [],
      },
    };

    const response_Finish: ServerResponseEvent_Extended = {
      endpoint: 'deselectTextCompleted',
      payload: {
        eventId,
        workerState: newWorkerState_Finish,
      },
    };

    // UPDATE LOCAL STATE & RESPOND
    updateLocalState(newWorkerState_Finish);

    respondToPuppet(response_Finish);
  }
};

export default deselectText;
