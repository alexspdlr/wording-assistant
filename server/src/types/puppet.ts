/* eslint-disable @typescript-eslint/ban-types */
// parent instance

export type PuppetAction = START | EXIT | OTHER;

interface START {
  command: 'START';
  payload: {
    id: number;
  };
}

interface EXIT {
  command: 'EXIT';
  payload: {};
}

interface OTHER {
  command: 'OTHER';
  payload: {
    data: any;
  };
}

type PuppetWaitingState =
  | 'waitingForSelectedText'
  | 'waitingForSelectedWord'
  | 'waitingForSelectedWordingAlternative';
type PuppetProcessingState =
  | 'initializing'
  | 'generatingRephrasingBase'
  | 'generatingWordingAlternatives'
  | 'generatingRephrasedText'
  | 'deselectingWord'
  | 'terminating';
export type PuppetState = PuppetWaitingState | PuppetProcessingState;
export interface PuppetInfo {
  id: number;
  puppetState: PuppetState;
}

// worker

export type PuppetWorkerResponse =
  | START_COMPLETED
  | EXIT_COMPLETED
  | OTHER_ACTION_COMPLETED;

interface START_COMPLETED {
  code: 'START_COMPLETED';
  payload: {
    id: number;
  };
}

interface EXIT_COMPLETED {
  code: 'EXIT_COMPLETED';
  payload: {};
}

interface OTHER_ACTION_COMPLETED {
  code: 'OTHER';
  payload: {
    data: any;
  };
}
