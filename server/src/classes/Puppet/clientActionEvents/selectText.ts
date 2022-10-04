import puppeteer_select_text from '../../../operations/selectText';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';
import handleError from '../otherEvents/handleError';

const selectText = async (
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  inputText: string
) => {
  if (localState.page && localState.browser) {
    /* -------------------------------------------------------------------------- */
    /*                                    START                                   */
    /* -------------------------------------------------------------------------- */

    // CREATE NEW WORKER STATE & RESPONSE
    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingSelectText',
      data: {
        ...localState.workerState.data,
        inputText,
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'selectTextStarted',
      workerState: newWorkerState_Start,
    };

    // UPDATE LOCAL STATE & RESPOND
    updateLocalState(newWorkerState_Start);

    respondToPuppet(response_Start);

    /* -------------------------------------------------------------------------- */
    /*                                   FINISH                                   */
    /* -------------------------------------------------------------------------- */

    // ACTION
    const response = await puppeteer_select_text(
      inputText,
      localState.page,
      localState.browser
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
          inputText,
          targetText:
            response.data.result || localState.workerState.data.targetText,
        },
      };

      const response_Finish: ServerResponseEvent_Extended = {
        endpoint: 'selectTextCompleted',
        workerState: newWorkerState_Finish,
      };

      // UPDATE LOCAL STATE & RESPOND
      updateLocalState(newWorkerState_Finish);

      respondToPuppet(response_Finish);
    }
  }
};

export default selectText;