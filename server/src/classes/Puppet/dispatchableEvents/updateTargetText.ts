import puppeteer_update_target_text from '../../../operations/updateTargetText';
import {
  PuppetWorkerState,
  ReceivableEventPayload_UpdateTargetTextCompleted,
  ReceivableEventPayload_UpdateTargetTextStarted,
  ReceivableEventWorker,
} from '../../../types';

const updateTargetText = async (
  newCursorIndex: number,
  updatedText: string,
  localState: PuppetWorkerState,
  respondToPuppet: (response: ReceivableEventWorker) => void
) => {
  if (localState.page && localState.browser) {
    console.log(
      'BEFORE UPDATE TARGET TEXT: ',
      newCursorIndex,
      updatedText,
      localState
    );

    // BEFORE PROCESSING
    const startedPayload: ReceivableEventPayload_UpdateTargetTextStarted = {
      newCursorIndex,
      updatedText,
    };

    const responseStarted: ReceivableEventWorker = {
      code: 'UPDATE_TARGET_TEXT_STARTED',
      payload: startedPayload,
    };

    respondToPuppet(responseStarted);

    // AFTER PROCESSING
    const rephrasingOptions = await puppeteer_update_target_text(
      localState.page,
      '[dl-test=translator-target-input]',
      newCursorIndex,
      updatedText
    );

    const finishedPayload: ReceivableEventPayload_UpdateTargetTextCompleted = {
      rephrasingOptions,
    };

    const responseFinished: ReceivableEventWorker = {
      code: 'UPDATE_TARGET_TEXT_COMPLETED',
      payload: finishedPayload,
    };

    respondToPuppet(responseFinished);
  }
};

export default updateTargetText;
