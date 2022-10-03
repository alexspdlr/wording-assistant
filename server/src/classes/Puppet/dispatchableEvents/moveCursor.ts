import puppeteer_move_cursor from '../../../operations/moveCursor';
import {
  PuppetWorkerState,
  ReceivableEventPayload_DeselectTextCompleted,
  ReceivableEventPayload_DeselectTextStarted,
  ReceivableEventPayload_MoveCursorCompleted,
  ReceivableEventPayload_MoveCursorStarted,
  ReceivableEventWorker,
} from '../../../types';

const moveCursor = async (
  newCursorIndex: number,
  localState: PuppetWorkerState,
  respondToPuppet: (response: ReceivableEventWorker) => void
) => {
  if (localState.page && localState.browser) {
    // BEFORE PROCESSING
    const startedPayload: ReceivableEventPayload_MoveCursorStarted = {
      newCursorIndex,
    };

    const responseStarted: ReceivableEventWorker = {
      code: 'MOVE_CURSOR_STARTED',
      payload: startedPayload,
    };

    respondToPuppet(responseStarted);

    // AFTER PROCESSING
    const rephrasingOptions = await puppeteer_move_cursor(
      localState.page,
      '[dl-test=translator-target-input]',
      newCursorIndex
    );

    const finishedPayload: ReceivableEventPayload_MoveCursorCompleted = {
      rephrasingOptions,
    };

    const responseFinished: ReceivableEventWorker = {
      code: 'MOVE_CURSOR_COMPLETED',
      payload: finishedPayload,
    };

    respondToPuppet(responseFinished);
  }
};

export default moveCursor;
