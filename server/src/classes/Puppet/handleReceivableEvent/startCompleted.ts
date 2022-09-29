import {
  ActiveWorkerState,
  ActiveWorkerStateData_WaitingForSelectText,
} from '../../../types/socket';

const startCompleted = (
  setWorkerState: (newState: ActiveWorkerState) => void,
  setWorkerStartedTrue: () => void
) => {
  const startCompletedWorkerStateData: ActiveWorkerStateData_WaitingForSelectText =
    {};

  setWorkerState({
    stateName: 'waitingForSelectText',
    data: startCompletedWorkerStateData,
  });

  setWorkerStartedTrue();
};

export default startCompleted;
