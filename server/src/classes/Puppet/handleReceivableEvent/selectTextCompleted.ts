import {
  ReceivableEventPayload_PuppetSelectTextCompleted,
  ReceivableEventPuppet,
} from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_WaitingForSelectWord,
} from '../../../types/socket';

const selectTextCompleted = (
  event: ReceivableEventPuppet,
  setWorkerState: (newState: ActiveWorkerState) => void,
  respondToPuppetMaster: (response: ReceivableEventPuppet) => void
) => {
  const selectTextFinishedWorkerStateData: ActiveWorkerStateData_WaitingForSelectWord =
    {
      inputText: (
        event.payload as ReceivableEventPayload_PuppetSelectTextCompleted
      ).inputText,
      rephrasingBase: (
        event.payload as ReceivableEventPayload_PuppetSelectTextCompleted
      ).rephrasingBase,
    };

  setWorkerState({
    stateName: 'waitingForSelectWord',
    data: selectTextFinishedWorkerStateData,
  });

  respondToPuppetMaster(event);
};

export default selectTextCompleted;
