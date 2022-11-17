import puppeteer_update_target_text from '../../../operations/updateTargetText';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerTextSelection,
} from '../../../types/socket';
import handleError from '../otherEvents/handleError';

/**
 * The function is triggered by the client-action-event "updateTargetText" and:
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
 * @param newActiveTextSelection
 */

const handleUpdateTargetText = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  newActiveTextSelection: ActiveWorkerTextSelection
) => {
  if (localState.page && localState.browser) {
    /* ------------------ Before executing client-action-event ------------------ */

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

    updateLocalState(newWorkerState_Start);

    respondToPuppet(response_Start);

    /* ----------------------- Execute client-action-event ---------------------- */

    const response = await puppeteer_update_target_text(
      localState.page,
      '[dl-test=translator-target-input]',
      newActiveTextSelection.value
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

export default handleUpdateTargetText;
