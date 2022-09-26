import { parentPort, threadId } from 'worker_threads';
import { Puppet } from '../Puppet/Puppet';
import {
  PuppetMasterAction,
  PuppetMasterWorkerResponse,
} from '../../types/puppetMaster';
import { PuppetInfo } from '../../types/puppet';
import waitUntil from '../../utils/waitUntil';

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

  const generateResponse = (): PuppetMasterWorkerResponse => {
    return {
      code: 'START_COMPLETED',
      payload: localState.puppets.map((puppet) => {
        return {
          id: puppet.pId,
          puppetState: puppet.puppetState,
        };
      }),
    };
  };

  // update state in parent before worker started
  parentPort?.postMessage(generateResponse());

  // update state in parent after 1st worker started
  await waitUntil(() => localState.puppets[0].workerStarted === true);
  parentPort?.postMessage(generateResponse());

  // update state in parent after all workers started
  await waitUntil(
    () =>
      localState.puppets.filter((puppet) => puppet.workerStarted === false)
        .length === 0
  );

  const allWorkersStartedResponse: PuppetMasterWorkerResponse =
    generateResponse();
  return allWorkersStartedResponse;
};

const exit = async () => {
  for (const puppet of localState.puppets) {
    puppet.kill();
  }

  await waitUntil(
    () =>
      localState.puppets.filter((puppet) => puppet.workerTerminated === false)
        .length === 0
  );

  const exitResponse: PuppetMasterWorkerResponse = {
    code: 'EXIT_COMPLETED',
    payload: localState.puppets.map((puppet) => {
      return {
        id: puppet.pId,
        puppetState: puppet.puppetState,
      };
    }),
  };

  return exitResponse;
};
