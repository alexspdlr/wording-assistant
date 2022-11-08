import { ActiveWorkerState } from '../../../types/socket';

/**
 * Util function that generates the initial state for the worker thread of a newly created puppet
 * @param variant
 * @param id
 * @returns inital ActiveWorkerState
 */
const generateDefaultWorkerState = (
  variant: 'start' | 'exit',
  id?: string
): ActiveWorkerState => {
  return {
    stateName:
      variant === 'start' ? 'processingInitialize' : 'processingTerminate',
    data: {
      id: id || '',
      originalTextSelection: null,
      activeTextSelection: null,
      caretIndex: 0,
      rephrasingOptions: [],
    },
  };
};

export default generateDefaultWorkerState;
