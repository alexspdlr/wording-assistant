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
      originalText: null,
      targetText: null,
      cursorIndex: 0,
      rephrasingOptions: [],
      sourceSelectionStart: null,
      sourceSelectionEnd: null,
    },
  };
};

export default generateDefaultWorkerState;
