import { PuppetState, ServerResponseEvent_Extended } from '../../../types';
import { ActiveWorkerState } from '../../../types/socket';

const exit = async (
  localState: PuppetState,
  updateLocalState: (workerState: ActiveWorkerState) => void,
  respondToPuppet: (response: ServerResponseEvent_Extended) => void
) => {
  // ACTION
  await localState.browser?.close();

  // CREATE NEW WORKER STATE & RESPONSE
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

  // UPDATE LOCAL STATE & RESPOND
  updateLocalState(newWorkerState);

  respondToPuppet(response);
};
export default exit;
