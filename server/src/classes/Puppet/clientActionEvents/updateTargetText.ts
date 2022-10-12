import puppeteer_update_target_text from '../../../operations/updateTargetText';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerTextSelection,
} from '../../../types/socket';
import handleError from '../otherEvents/handleError';

const updateTargetText = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  newActiveTextSelection: ActiveWorkerTextSelection
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
        activeTextSelection: newActiveTextSelection,
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
      newActiveTextSelection.value
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

      const newActiveSelectionValue: string =
        response.data.targetText ||
        localState.workerState.data.activeTextSelection?.value;

      const newActiveTextSelection: ActiveWorkerTextSelection = {
        value: newActiveSelectionValue,
        startIndex:
          localState.workerState.data.originalTextSelection?.startIndex || 0,
        endIndex:
          (localState.workerState.data.originalTextSelection?.startIndex || 0) +
          newActiveSelectionValue.length,
      };

      const newWorkerState_Finish: ActiveWorkerState = {
        stateName: 'waitingForTargetTextAction',
        data: {
          ...localState.workerState.data,
          activeTextSelection: newActiveTextSelection,
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
