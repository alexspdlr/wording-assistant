import {
  PuppetWorkerState,
  ReceivableEventPayload_ExitCompleted,
  ReceivableEventWorker,
} from '../../../types';

const exit = async (
  localState: PuppetWorkerState,
  respondToPuppet: (response: ReceivableEventWorker) => void
) => {
  await localState.browser?.close();

  const payload: ReceivableEventPayload_ExitCompleted = {};

  const response: ReceivableEventWorker = {
    code: 'EXIT_COMPLETED',
    payload,
  };

  respondToPuppet(response);
};
export default exit;
