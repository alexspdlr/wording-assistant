import { parentPort, threadId } from 'worker_threads';
import { Puppet } from '../Puppet/Puppet';
import waitUntil from '../../utils/waitUntil';
import {
  PuppetMasterDispatchableEvent,
  PuppetMasterReceivableEvent,
  PuppetMasterUserDispatchableEvent,
} from '../../types/puppetMaster';
import { puppetProcessingStateNames } from '../../types/puppet';

parentPort?.on('message', async (event: PuppetMasterDispatchableEvent) => {
  const response = await handleDispatchableEvent(event);

  if (response) {
    respondToParent(response);
  }
});

interface PuppetMasterWorkerState {
  puppets: Puppet[];
}

const localState: PuppetMasterWorkerState = {
  puppets: [],
};

const handleDispatchableEvent = async (
  event: PuppetMasterDispatchableEvent
): Promise<PuppetMasterReceivableEvent | undefined> => {
  let targetPuppet: Puppet;

  console.log(`${event.command}: `, event.payload);

  if (event.command !== 'START_PUPPETMASTER' && !localState.puppets[0]) {
    respondToParentWithError('NO_PUPPET_AVAILABLE');
    return;
  } else {
    targetPuppet = localState.puppets[0];
  }

  switch (event.command) {
    case 'START_PUPPETMASTER':
      const { id, numberOfMaintainedPuppets } = event.payload;

      const response = startAllPuppets(id, numberOfMaintainedPuppets);

      return response;

    case 'SELECT_TEXT':
      if (targetPuppet.puppetState.stateName !== 'waitingForSelectText') {
        const targetPuppetIsProcessing = Object.values(
          puppetProcessingStateNames
        ).includes(targetPuppet.puppetState.stateName);

        const timeout = 10000;
        if (targetPuppetIsProcessing) {
          const preconditionFulfilled = await waitUntil(
            () => targetPuppet.puppetState.stateName === 'waitingForSelectText',
            timeout
          );

          if (!preconditionFulfilled) {
            respondToParentWithError(
              'PRECONDITION_NOT_FULFILLED_AFTER_TIMEOUT'
            );
            return;
          }
        } else {
          respondToParentWithError('PRECONDITION_NOT_FULFILLED');
          return;
        }
      }

      forwardEventToPuppet(targetPuppet, event);
      return;

    case 'DESELECT_TEXT':
      return;

    case 'SELECT_WORD':
      return;

    case 'DESELECT_WORD':
      return;

    case 'SELECT_WORDING_ALTERNATIVE':
      return;

    case 'EXIT_PUPPETMASTER':
      const exitResponse = terminateAllPuppets();
      return exitResponse;

    default:
      return;
  }
};

const startAllPuppets = async (
  id: string,
  numberOfMaintainedPuppets: number
) => {
  const puppets = [...Array(numberOfMaintainedPuppets)].map(
    () => new Puppet(id)
  );
  localState.puppets = puppets;

  // update state in parent after 1st worker started
  await waitUntil(() => localState.puppets[0].workerStarted === true);

  // update state in parent after all workers started
  await waitUntil(
    () =>
      localState.puppets.filter((puppet) => puppet.workerStarted === false)
        .length === 0
  );

  const startedResponse: PuppetMasterReceivableEvent = {
    code: 'PUPPETMASTER_START_COMPLETED',
    payload: localState.puppets.map((puppet) => {
      return {
        id: puppet.pId,
        puppetState: puppet.puppetState,
      };
    }),
  };
  return startedResponse;
};

const forwardEventToPuppet = (
  puppet: Puppet,
  event: PuppetMasterUserDispatchableEvent
) => {
  puppet.dispatchEvent(event);
};

const terminateAllPuppets = async () => {
  for (const puppet of localState.puppets) {
    puppet.kill();
  }

  await waitUntil(
    () =>
      localState.puppets.filter((puppet) => puppet.workerTerminated === false)
        .length === 0
  );

  const exitResponse: PuppetMasterReceivableEvent = {
    code: 'PUPPETMASTER_EXIT_COMPLETED',
    payload: localState.puppets.map((puppet) => {
      return {
        id: puppet.pId,
        puppetState: puppet.puppetState,
      };
    }),
  };

  return exitResponse;
};

const respondToParent = (response: PuppetMasterReceivableEvent) => {
  parentPort?.postMessage(response);
};

const respondToParentWithError = (errorText: string) => {
  console.error(errorText);

  const response: PuppetMasterReceivableEvent = {
    code: 'PUPPETMASTER_ERROR_OCCURED',
    payload: localState.puppets.map((puppet) => {
      return {
        id: puppet.pId,
        puppetState: puppet.puppetState,
      };
    }),
  };

  parentPort?.postMessage(response);
};
