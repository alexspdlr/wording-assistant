import {
  PuppetWorkerState,
  ReceivableEventPayload_PuppetExitCompleted,
  ReceivableEventPuppet,
} from '../../../types';

const exit = async (
  localState: PuppetWorkerState,
  respondToPuppet: (response: ReceivableEventPuppet) => void
) => {
  await localState.browser?.close();

  const payload: ReceivableEventPayload_PuppetExitCompleted = {};

  const response: ReceivableEventPuppet = {
    code: 'PUPPET_EXIT_COMPLETED',
    payload,
  };

  respondToPuppet(response);
};
export default exit;
