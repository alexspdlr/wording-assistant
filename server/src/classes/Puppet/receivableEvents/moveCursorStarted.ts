import {
  ReceivableEventPayload_SelectTextStarted,
  ReceivableEvent,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingMoveCursor,
} from '../../../types/socket';

const moveCursorStarted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const moveCursorStartedWorkerStateData: ActiveWorkerStateData_ProcessingMoveCursor =
    {
      inputText: (event.payload as ReceivableEventPayload_SelectTextStarted)
        .inputText,
    };

  const newWorkerState: ActiveWorkerState = {
    stateName: 'processingMoveCursor',
    data: moveCursorStartedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default moveCursorStarted;
