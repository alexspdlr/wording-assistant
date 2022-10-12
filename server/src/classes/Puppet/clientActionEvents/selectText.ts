import puppeteer_select_text from '../../../operations/selectText';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerTextSelection,
} from '../../../types/socket';
import handleError from '../otherEvents/handleError';

const selectText = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  originalTextSelection: ActiveWorkerTextSelection
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
        originalTextSelection: originalTextSelection,
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'selectTextStarted',
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
    const response = await puppeteer_select_text(
      originalTextSelection.value,
      localState.page,
      localState.browser
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
      const newActiveSelectionValue: string =
        response.data.result ||
        localState.workerState.data.activeTextSelection?.value;

      const newActiveTextSelection: ActiveWorkerTextSelection = {
        value: newActiveSelectionValue,
        startIndex: originalTextSelection.startIndex,
        endIndex:
          originalTextSelection.endIndex + newActiveSelectionValue.length,
      };

      // CREATE NEW WORKER STATE & RESPONSE
      const newWorkerState_Finish: ActiveWorkerState = {
        stateName: 'waitingForTargetTextAction',
        data: {
          ...localState.workerState.data,
          originalTextSelection: originalTextSelection,
          activeTextSelection: newActiveTextSelection,
        },
      };

      const response_Finish: ServerResponseEvent_Extended = {
        endpoint: 'selectTextCompleted',
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

export default selectText;
