import { ReceivableEvent } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingDeselectText,
} from '../../../types/socket';

const deselectTextStarted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const deselectTextStartedWorkerStateData: ActiveWorkerStateData_ProcessingDeselectText =
    {};

  const newWorkerState: ActiveWorkerState = {
    stateName: 'processingDeselectText',
    data: deselectTextStartedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default deselectTextStarted;
