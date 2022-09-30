import { ReceivableEvent } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_WaitingForSelectText,
} from '../../../types/socket';

const startCompleted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  setWorkerStartedTrue: () => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const startCompletedWorkerStateData: ActiveWorkerStateData_WaitingForSelectText =
    {};

  const newWorkerState: ActiveWorkerState = {
    stateName: 'waitingForSelectText',
    data: startCompletedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  setWorkerStartedTrue();

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default startCompleted;