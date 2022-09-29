import {
  ReceivableEventPayload_SelectTextStarted,
  ReceivableEvent,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingSelectText,
} from '../../../types/socket';

const selectTextStarted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const selectTextStartedWorkerStateData: ActiveWorkerStateData_ProcessingSelectText =
    {
      inputText: (event.payload as ReceivableEventPayload_SelectTextStarted)
        .inputText,
    };

  const newWorkerState: ActiveWorkerState = {
    stateName: 'processingSelectText',
    data: selectTextStartedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default selectTextStarted;
