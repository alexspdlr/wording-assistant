import { ReceivableEvent } from '../../../types';

const exitCompleted = async (
  event: ReceivableEvent,
  terminateWorker: () => Promise<number>,
  setWorkerTerminatedTrue: () => void,
  respondToSocket: (response: ReceivableEvent) => void
) => {
  await terminateWorker();

  setWorkerTerminatedTrue();

  respondToSocket(event);
};

export default exitCompleted;
