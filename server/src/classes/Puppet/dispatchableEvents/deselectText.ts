import puppeteer_reset_page from '../../../operations/resetPage';
import {
  PuppetWorkerState,
  ReceivableEventPayload_DeselectTextCompleted,
  ReceivableEventPayload_DeselectTextStarted,
  ReceivableEventWorker,
} from '../../../types';

const deselectText = async (
  inputText: string,
  localState: PuppetWorkerState,
  respondToPuppet: (response: ReceivableEventWorker) => void
) => {
  if (localState.page && localState.browser) {
    // BEFORE PROCESSING
    const startedPayload: ReceivableEventPayload_DeselectTextStarted = {};

    const responseStarted: ReceivableEventWorker = {
      code: 'DESELECT_TEXT_STARTED',
      payload: startedPayload,
    };

    respondToPuppet(responseStarted);

    // AFTER PROCESSING
    await puppeteer_reset_page(localState.page, localState.browser);

    const finishedPayload: ReceivableEventPayload_DeselectTextCompleted = {};

    const responseFinished: ReceivableEventWorker = {
      code: 'DESELECT_TEXT_COMPLETED',
      payload: finishedPayload,
    };

    respondToPuppet(responseFinished);
  }
};

export default deselectText;
