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
