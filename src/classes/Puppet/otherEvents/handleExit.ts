import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';

/**
 * The function is triggered when losing connection to a socket and:
 *
 *   - closes the associated browser
 *
 *   - forms and returns a server-response-event with information about terminating the thread
 *
 * @param localState
 * @param updateLocalState
 * @param respondToPuppet
 */

const handleExit = async (
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void
) => {
  /* ---------------------------- Close the browser --------------------------- */

  await localState.browser?.close();

  /* ------------------------ After closing the browser ----------------------- */

  const newWorkerState: ActiveWorkerState = {
    stateName: 'processingTerminate',
    data: {
      ...localState.workerState.data,
    },
  };

  const response: ServerResponseEvent_Extended = {
    endpoint: 'exitCompleted',
    payload: {
      eventId: '',
      workerState: newWorkerState,
    },
  };

  updateLocalState(newWorkerState);

  respondToPuppet(response);
};
export default handleExit;
