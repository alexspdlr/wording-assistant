import puppeteer_reset_page from '../../../operations/resetPage';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';

/**
 * The function is triggered by the client-action-event "deselectText" and:
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
 */

const handleDeselectText = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void
) => {
  if (localState.page && localState.browser) {
    /* ------------------ Before executing client-action-event ------------------ */

    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingDeselectText',
      data: {
        id: localState.workerState.data.id,
        originalTextSelection: null,
        activeTextSelection: null,
        caretIndex: 0,
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

    updateLocalState(newWorkerState_Start);

    respondToPuppet(response_Start);

    /* ----------------------- Execute client-action-event ---------------------- */

    await puppeteer_reset_page(localState.page);

    /* ------------------- After executing client-action-event ------------------ */

    const newWorkerState_Finish: ActiveWorkerState = {
      stateName: 'waitingForSelectText',
      data: {
        id: localState.workerState.data.id,
        originalTextSelection: null,
        activeTextSelection: null,
        caretIndex: 0,
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

    updateLocalState(newWorkerState_Finish);

    respondToPuppet(response_Finish);
  }
};

export default handleDeselectText;
