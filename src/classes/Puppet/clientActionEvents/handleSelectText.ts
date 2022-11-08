import puppeteer_select_text from '../../../operations/selectText';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerTextSelection,
} from '../../../types/socket';
import handleError from '../otherEvents/handleError';

/**
 * The function is triggered by the client-action-event "selectText" and:
 *
 *   - forms and returns a server-response-event with information about the "processing"-state of the puppet-worker BEFORE executing the client-action-event
 *
 *   - executes the client-action-event
 *
 *   - forms and returns a server-response-event with information about the new state of the puppet-worker AFTER executing the client-action-event
 *
 * @param eventId
 * @param localState
 * @param updateLocalState
 * @param respondToPuppet
 * @param originalTextSelection
 */

const handleSelectText = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  originalTextSelection: ActiveWorkerTextSelection
) => {
  if (localState.page && localState.browser) {
    /* ------------------ Before executing client-action-event ------------------ */

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

    updateLocalState(newWorkerState_Start);

    respondToPuppet(response_Start);

    /* ----------------------- Execute client-action-event ---------------------- */

    const response = await puppeteer_select_text(
      originalTextSelection.value,
      localState.page
    );

    /* ------------------- After executing client-action-event ------------------ */

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
          originalTextSelection.startIndex + newActiveSelectionValue.length,
      };

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

      updateLocalState(newWorkerState_Finish);

      respondToPuppet(response_Finish);
    }
  }
};

export default handleSelectText;
