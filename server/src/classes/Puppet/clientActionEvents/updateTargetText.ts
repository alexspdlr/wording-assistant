import puppeteer_update_target_text from '../../../operations/updateTargetText';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';
import handleError from '../otherEvents/handleError';

const updateTargetText = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  updatedText: string
) => {
  if (localState.page && localState.browser) {
    /* -------------------------------------------------------------------------- */
    /*                                    START                                   */
    /* -------------------------------------------------------------------------- */

    // CREATE NEW WORKER STATE & RESPONSE
    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingUpdateTargetText',
      data: {
        ...localState.workerState.data,
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'updateTargetTextStarted',
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
    const response = await puppeteer_update_target_text(
      localState.page,
      '[dl-test=translator-target-input]',
      updatedText
    );

    // HANDLE ERROR
    if (response.type === 'error') {
      await handleError(
        eventId,
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
          targetText: response.data.targetText,
        },
      };

      const response_Finish: ServerResponseEvent_Extended = {
        endpoint: 'updateTargetTextCompleted',
        payload: {
          eventId,
          workerState: newWorkerState_Finish,
        },
      };

      // UPDATE LOCAL STATE & RESPOND
      updateLocalState(newWorkerState_Finish);

      respondToPuppet(response_Finish);
    }
  }
};

export default updateTargetText;
