import puppeteer_move_cursor from '../../../operations/moveCursor';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';
import handleError from '../otherEvents/handleError';

const moveCursor = async (
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  newCursorIndex: number
) => {
  if (localState.page && localState.browser) {
    /* -------------------------------------------------------------------------- */
    /*                                    START                                   */
    /* -------------------------------------------------------------------------- */

    // CREATE NEW WORKER STATE & RESPONSE
    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingMoveCursor',
      data: {
        ...localState.workerState.data,
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'moveCursorStarted',
      workerState: newWorkerState_Start,
    };

    // UPDATE LOCAL STATE & RESPOND
    updateLocalState(newWorkerState_Start);

    respondToPuppet(response_Start);

    /* -------------------------------------------------------------------------- */
    /*                                   FINISH                                   */
    /* -------------------------------------------------------------------------- */

    // ACTION
    const response = await puppeteer_move_cursor(
      localState.page,
      '[dl-test=translator-target-input]',
      newCursorIndex
    );

    // HANDLE ERROR

    if (response.type === 'error') {
      await handleError(
        localState,
        updateLocalState,
        respondToPuppet,
        response.data
      );
    } else {
      // CREATE NEW WORKER STATE & RESPONSE
      const newWorkerState_Finish: ActiveWorkerState = {
        stateName: 'waitingForTargetTextAction',
        data: {
          ...localState.workerState.data,
          cursorIndex: newCursorIndex,
          rephrasingOptions: response.data.rephrasingOptions,
        },
      };

      const response_Finish: ServerResponseEvent_Extended = {
        endpoint: 'moveCursorCompleted',
        workerState: newWorkerState_Finish,
      };

      // UPDATE LOCAL STATE & RESPOND
      updateLocalState(newWorkerState_Finish);

      respondToPuppet(response_Finish);
    }
  }
};

export default moveCursor;
