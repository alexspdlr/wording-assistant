import {
  ReceivableEvent,
  ReceivableEventPayload_SelectWordingAlternativeCompleted,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_WaitingForMoveCursor,
} from '../../../types/socket';

const selectWordingAlternativeCompleted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const selectWordingAlternativeCompletedWorkerStateData: ActiveWorkerStateData_WaitingForMoveCursor =
    {
      rephrasingBase: (
        event.payload as ReceivableEventPayload_SelectWordingAlternativeCompleted
      ).rephrasingResult,
    };

  const newWorkerState: ActiveWorkerState = {
    stateName: 'waitingForMoveCursor',
    data: selectWordingAlternativeCompletedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default selectWordingAlternativeCompleted;
