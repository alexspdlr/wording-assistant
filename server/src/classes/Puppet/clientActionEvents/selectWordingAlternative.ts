import { Browser, Page } from 'puppeteer';
import selectWordingAlternative from '../../../operations/selectWordingAlternative';
import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';
import handleError from '../otherEvents/handleError';

const selectWordingAlternativeExported = async (
  eventId: string,
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void,
  selectedAlternativeIndex: number
) => {
  if (localState.page && localState.browser) {
    /* -------------------------------------------------------------------------- */
    /*                                    START                                   */
    /* -------------------------------------------------------------------------- */

    // CREATE NEW WORKER STATE & RESPONSE
    const newWorkerState_Start: ActiveWorkerState = {
      stateName: 'processingSelectWordingAlternative',
      data: {
        ...localState.workerState.data,
      },
    };

    const response_Start: ServerResponseEvent_Extended = {
      endpoint: 'selectWordingAlternativeStarted',
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
    const response = await selectWordingAlternative(
      selectedAlternativeIndex,
      localState.page
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
          targetText:
            response.data.rephrasingResult ||
            localState.workerState.data.targetText,
        },
      };

      const response_Finish: ServerResponseEvent_Extended = {
        endpoint: 'selectWordingAlternativeCompleted',
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

export default selectWordingAlternativeExported;
