const exitCompleted = async (
  terminateWorker: () => Promise<number>,
  setWorkerTerminatedTrue: () => void
) => {
  await terminateWorker();
  setWorkerTerminatedTrue();
};

export default exitCompleted;
