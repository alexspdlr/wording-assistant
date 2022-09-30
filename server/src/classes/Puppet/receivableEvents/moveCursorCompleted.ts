import {
  ReceivableEventPayload_SelectTextCompleted,
  ReceivableEvent,
  ReceivableEventPayload_MoveCursorCompleted,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_WaitingForMoveCursor,
} from '../../../types/socket';

const moveCursorCompleted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const moveCursorCompletedWorkerStateData: ActiveWorkerStateData_WaitingForMoveCursor =
    {
      rephrasingOptions: (
        event.payload as ReceivableEventPayload_MoveCursorCompleted
      ).rephrasingOptions,
    };

  const newWorkerState: ActiveWorkerState = {
    stateName: 'waitingForMoveCursor',
    data: moveCursorCompletedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default moveCursorCompleted;
