import selectWordingAlternative from '../../../operations/selectWordingAlternative';
import {
  PuppetWorkerState,
  ReceivableEventPayload_SelectWordingAlternativeCompleted,
  ReceivableEventPayload_SelectWordingAlternativeStarted,
  ReceivableEventWorker,
} from '../../../types';

const selectWordingAlternativeExported = async (
  selectedAlternativeIndex: number,
  localState: PuppetWorkerState,
  respondToPuppet: (response: ReceivableEventWorker) => void
) => {
  if (localState.page && localState.browser) {
    // BEFORE PROCESSING
    const startedPayload: ReceivableEventPayload_SelectWordingAlternativeStarted =
      {
        selectedAlternativeIndex,
      };

    const responseStarted: ReceivableEventWorker = {
      code: 'SELECT_WORDING_ALTERNATIVE_STARTED',
      payload: startedPayload,
    };

    respondToPuppet(responseStarted);

    // AFTER PROCESSING
    const result = await selectWordingAlternative(
      selectedAlternativeIndex,
      localState.page
    );

    const finishedPayload: ReceivableEventPayload_SelectWordingAlternativeCompleted =
      {
        rephrasingResult: result || '',
      };

    const responseFinished: ReceivableEventWorker = {
      code: 'SELECT_WORDING_ALTERNATIVE_COMPLETED',
      payload: finishedPayload,
    };

    respondToPuppet(responseFinished);
  }
};

export default selectWordingAlternativeExported;
