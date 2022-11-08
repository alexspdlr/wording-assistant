import puppeteer_move_caret from '../../../operations/moveCaret';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';
import handleError from '../otherEvents/handleError';

/**
 * The function is triggered by the client-action-event "moveCaret" and:
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
 * @param newCaretIndex
 */

const handleMoveCaret = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  newCaretIndex: number
) => {
  if (localState.page && localState.browser) {
    /* ------------------ Before executing client-action-event ------------------ */

    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingmoveCaret',
      data: {
        ...localState.workerState.data,
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'moveCaretStarted',
      payload: {
        eventId,
        workerState: newWorkerState_Start,
      },
    };

    updateLocalState(newWorkerState_Start);

    respondToPuppet(response_Start);

    /* ----------------------- Execute client-action-event ---------------------- */

    const response = await puppeteer_move_caret(
      localState.page,
      '[dl-test=translator-target-input]',
      newCaretIndex
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
      const newWorkerState_Finish: ActiveWorkerState = {
        stateName: 'waitingForTargetTextAction',
        data: {
          ...localState.workerState.data,
          caretIndex: newCaretIndex,
          rephrasingOptions: response.data.rephrasingAlternatives,
        },
      };

      console.log(response.data.rephrasingAlternatives);

      const response_Finish: ServerResponseEvent_Extended = {
        endpoint: 'moveCaretCompleted',
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

export default handleMoveCaret;
