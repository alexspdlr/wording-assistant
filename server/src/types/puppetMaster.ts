/* eslint-disable @typescript-eslint/ban-types */
// parent instance

import { PuppetInfo } from './puppet';

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

// worker

export interface PuppetMasterWorkerResponse {
  code: PuppetMasterWorkerResponseCode;
  payload: PuppetInfo[];
}

type PuppetMasterWorkerResponseCode =
  | 'START_COMPLETED'
  | 'EXIT_COMPLETED'
  | 'OTHER';
