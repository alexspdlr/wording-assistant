import puppeteer_select_text from '../../../operations/selectText';
import {
  PuppetWorkerState,
  ReceivableEventPayload_PuppetSelectTextCompleted,
  ReceivableEventPayload_PuppetSelectTextStarted,
  ReceivableEventPuppet,
} from '../../../types';

const selectText = async (
  inputText: string,
  localState: PuppetWorkerState,
  respondToPuppet: (response: ReceivableEventPuppet) => void
) => {
  if (localState.page) {
    // BEFORE PROCESSING
    const startedPayload: ReceivableEventPayload_PuppetSelectTextStarted = {
      inputText,
    };

    const responseStarted: ReceivableEventPuppet = {
      code: 'PUPPET_SELECT_TEXT_STARTED',
      payload: startedPayload,
    };

    respondToPuppet(responseStarted);

    // AFTER PROCESSING
    const result = await puppeteer_select_text(inputText, localState.page);

    const finishedPayload: ReceivableEventPayload_PuppetSelectTextCompleted = {
      inputText,
      rephrasingBase: result,
    };

    const responseFinished: ReceivableEventPuppet = {
      code: 'PUPPET_SELECT_TEXT_COMPLETED',
      payload: finishedPayload,
    };

    respondToPuppet(responseFinished);
  }
};

export default selectText;
