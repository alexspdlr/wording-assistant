import {
  ReceivableEventPayload_SelectTextStarted,
  ReceivableEvent,
  ReceivableEventPayload_SelectWordingAlternativeStarted,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingSelectText,
  ActiveWorkerStateData_ProcessingSelectWordingAlternative,
} from '../../../types/socket';

const selectWordingAlternativeStarted = (
  event: ReceivableEvent,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  const selectWordingAlternativeStartedWorkerStateData: ActiveWorkerStateData_ProcessingSelectWordingAlternative =
    {
      selectedAlternativeIndex: (
        event.payload as ReceivableEventPayload_SelectWordingAlternativeStarted
      ).selectedAlternativeIndex,
    };

  const newWorkerState: ActiveWorkerState = {
    stateName: 'processingSelectWordingAlternative',
    data: selectWordingAlternativeStartedWorkerStateData,
  };

  setWorkerState(newWorkerState);

  respondToSocket({
    code: event.code,
    payload: event.payload,
    workerState: newWorkerState,
  });
};

export default selectWordingAlternativeStarted;
