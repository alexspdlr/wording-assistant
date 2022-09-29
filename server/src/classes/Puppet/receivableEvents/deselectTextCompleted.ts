import { ReceivableEvent } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_WaitingForSelectText,
} from '../../../types/socket';

const deselectTextCompleted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const deselectTextFinishedWorkerStateData: ActiveWorkerStateData_WaitingForSelectText =
    {};

  const newWorkerState: ActiveWorkerState = {
    stateName: 'waitingForSelectText',
    data: deselectTextFinishedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default deselectTextCompleted;
