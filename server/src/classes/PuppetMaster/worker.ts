import { parentPort, threadId } from 'worker_threads';
import { Puppet } from '../Puppet/Puppet';
import { PuppetMasterAction, PuppetMasterWorkerResponse } from './types';
import { waitUntil } from 'async-wait-until';

console.info('Spawned a PUPPET_MASTER_WORKER');

parentPort?.on('message', async (action: PuppetMasterAction) => {
  const response = await executeAction(action);

  if (response) {
    parentPort?.postMessage(response);
  }
});

interface PuppetMasterWorkerState {
  puppets: Puppet[];
}

const localState: PuppetMasterWorkerState = {
  puppets: [],
};

const executeAction = async (
  action: PuppetMasterAction
): Promise<PuppetMasterWorkerResponse | undefined> => {
  switch (action.command) {
    case 'OTHER':
      // code block
      return;

    case 'START':
      const { id, numberOfMaintainedPuppets } = action.payload;
      const response = start(id, numberOfMaintainedPuppets);
      return response;

    case 'EXIT':
      const exitResponse = exit();
      return exitResponse;

    default:
      return;
  }
};

const start = async (id: string, numberOfMaintainedPuppets: number) => {
  const puppets = [...Array(numberOfMaintainedPuppets)].map(
    () => new Puppet(id)
  );

  localState.puppets = puppets;
  console.log(`Started PUPPET_MASTER_WORKER with id: ${id}`);

  const startResponse: PuppetMasterWorkerResponse = {
    code: 'START_COMPLETED',
    payload: {
      puppetIds: puppets.map((puppet) => puppet.pId),
    },
  };

  return startResponse;
};

const exit = async () => {
  // TODO: dont return response before all puppet workers have sent "EXIT_COMPLETED"

  // wait until puppet.workerTerminated = true for all puppets
  for (const puppet of localState.puppets) {
    puppet.kill();
  }

  console.log(`Before that.`);

  await waitUntil(
    () =>
      localState.puppets.filter((puppet) => puppet.workerTerminated === false)
        .length === 0
  );

  console.log(`After that.`);

  const exitResponse: PuppetMasterWorkerResponse = {
    code: 'EXIT_COMPLETED',
    payload: {},
  };

  return exitResponse;
};
