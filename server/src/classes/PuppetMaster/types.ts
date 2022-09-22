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
