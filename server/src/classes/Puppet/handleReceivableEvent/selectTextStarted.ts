import {
  ReceivableEventPayload_PuppetSelectTextStarted,
  ReceivableEventPuppet,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingSelectText,
} from '../../../types/socket';

const selectTextStarted = (
  event: ReceivableEventPuppet,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToPuppetMaster: (response: ReceivableEventPuppet) => void
) => {
  const selectTextStartedWorkerStateData: ActiveWorkerStateData_ProcessingSelectText =
    {
      inputText: (
        event.payload as ReceivableEventPayload_PuppetSelectTextStarted
      ).inputText,
    };

  setWorkerState({
    stateName: 'processingSelectText',
    data: selectTextStartedWorkerStateData,
  });

  respondToPuppetMaster(event);
};

export default selectTextStarted;
