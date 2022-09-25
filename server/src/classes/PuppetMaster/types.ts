/* eslint-disable @typescript-eslint/ban-types */
// parent instance to worker

export type PuppetMasterAction = START | EXIT | OTHER;

interface START {
  command: 'START';
  payload: {
    id: string;
    numberOfMaintainedPuppets: number;
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

// worker to parent instance

export type PuppetMasterWorkerResponse =
  | START_COMPLETED
  | EXIT_COMPLETED
  | OTHER_ACTION_COMPLETED;

interface START_COMPLETED {
  code: 'START_COMPLETED';
  payload: {
    puppetIds: number[];
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
