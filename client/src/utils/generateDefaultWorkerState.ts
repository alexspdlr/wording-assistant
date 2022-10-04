import { ActiveWorkerState } from 'src/types/socket';

const generateDefaultWorkerState = (
  variant: 'start' | 'exit',
  id?: string
): ActiveWorkerState => {
  return {
    stateName:
      variant === 'start' ? 'processingInitialize' : 'processingTerminate',
    data: {
      id: id || '',
      inputText: null,
      targetText: null,
      cursorIndex: 0,
      rephrasingOptions: [],
    },
  };
};

export default generateDefaultWorkerState;
