import {
  ReceivableEventPayload_SelectTextCompleted,
  ReceivableEvent,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_WaitingForMoveCursor,
} from '../../../types/socket';

const selectTextCompleted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const selectTextFinishedWorkerStateData: ActiveWorkerStateData_WaitingForMoveCursor =
    {
      inputText: (event.payload as ReceivableEventPayload_SelectTextCompleted)
        .inputText,
      rephrasingBase: (
        event.payload as ReceivableEventPayload_SelectTextCompleted
      ).rephrasingBase,
    };

  const newWorkerState: ActiveWorkerState = {
    stateName: 'waitingForMoveCursor',
    data: selectTextFinishedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default selectTextCompleted;
