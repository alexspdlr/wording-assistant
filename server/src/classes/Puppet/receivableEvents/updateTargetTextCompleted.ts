import {
  ReceivableEventPayload_SelectTextCompleted,
  ReceivableEvent,
  ReceivableEventPayload_MoveCursorCompleted,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_WaitingForMoveCursor,
} from '../../../types/socket';
import updateTargetText from '../dispatchableEvents/updateTargetText';

const updateTargetTextCompleted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const updateTargetTextCompletedWorkerStateData: ActiveWorkerStateData_WaitingForMoveCursor =
    {
      rephrasingOptions: (
        event.payload as ReceivableEventPayload_MoveCursorCompleted
      ).rephrasingOptions,
    };

  const newWorkerState: ActiveWorkerState = {
    stateName: 'waitingForMoveCursor',
    data: updateTargetTextCompletedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default updateTargetTextCompleted;
