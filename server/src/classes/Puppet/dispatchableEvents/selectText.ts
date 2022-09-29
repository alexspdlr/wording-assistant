import puppeteer_select_text from '../../../operations/selectText';
import {
  PuppetWorkerState,
  ReceivableEventPayload_SelectTextCompleted,
  ReceivableEventPayload_SelectTextStarted,
  ReceivableEventWorker,
} from '../../../types';

const selectText = async (
  inputText: string,
  localState: PuppetWorkerState,
  respondToPuppet: (response: ReceivableEventWorker) => void
) => {
  if (localState.page && localState.browser) {
    // BEFORE PROCESSING
    const startedPayload: ReceivableEventPayload_SelectTextStarted = {
      inputText,
    };

    const responseStarted: ReceivableEventWorker = {
      code: 'SELECT_TEXT_STARTED',
      payload: startedPayload,
    };

    respondToPuppet(responseStarted);

    // AFTER PROCESSING
    const result = await puppeteer_select_text(
      inputText,
      localState.page,
      localState.browser
    );

    const finishedPayload: ReceivableEventPayload_SelectTextCompleted = {
      inputText,
      rephrasingBase: result || '',
    };

    const responseFinished: ReceivableEventWorker = {
      code: 'SELECT_TEXT_COMPLETED',
      payload: finishedPayload,
    };

    respondToPuppet(responseFinished);
  }
};

export default selectText;
