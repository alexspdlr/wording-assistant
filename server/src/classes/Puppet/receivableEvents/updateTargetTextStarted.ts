import {
  ReceivableEvent,
  ReceivableEventPayload_UpdateTargetTextStarted,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingUpdateTargetText,
} from '../../../types/socket';

const updateTargetTextStarted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const updateTargetTextStartedWorkerStateData: ActiveWorkerStateData_ProcessingUpdateTargetText =
    {
      newTargetText: (
        event.payload as ReceivableEventPayload_UpdateTargetTextStarted
      ).updatedText,
    };

  const newWorkerState: ActiveWorkerState = {
    stateName: 'processingUpdateTargetText',
    data: updateTargetTextStartedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default updateTargetTextStarted;
