import { parentPort, threadId } from 'worker_threads';
import { Puppet } from '../Puppet/Puppet';
import waitUntil from '../../utils/waitUntil';
import {
  DispatchableEvent,
  PuppetInfo,
  ReceivableEventPuppet,
  ReceivableEvent,
  DispatchableEventPayload_StartPuppetMaster,
} from '../../types/index';

parentPort?.on('message', async (event: DispatchableEvent) => {
  const response = await handleDispatchableEvent(event);

  if (response) {
    respondToPuppetMaster(response);
  }
});

interface PuppetMasterWorkerState {
  puppets: Puppet[];
}

const localState: PuppetMasterWorkerState = {
  puppets: [],
};

const handleDispatchableEvent = async (
  event: DispatchableEvent
): Promise<ReceivableEvent | undefined> => {
  let targetPuppet: Puppet;

  if (event.command !== 'START_PUPPETMASTER' && !localState.puppets[0]) {
    return;
  } else {
    targetPuppet = localState.puppets[0];
  }

  switch (event.command) {
    case 'START_PUPPETMASTER':
      const response = startAllPuppets(
        (event.payload as DispatchableEventPayload_StartPuppetMaster).id,
        (event.payload as DispatchableEventPayload_StartPuppetMaster)
          .numberOfMaintainedPuppets
      );

      return response;

    case 'SELECT_TEXT':
      // 1. update puppet state in pm
      // 2. respond with processing state to client

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
): Promise<ReceivableEvent> => {
  const puppets = [...Array(numberOfMaintainedPuppets)].map(
    () => new Puppet(id, respondToPuppetMaster)
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

  const startedResponse: ReceivableEvent = {
    code: 'PUPPETMASTER_START_COMPLETED',
    payload: {},
    puppetInfo: localState.puppets.map((puppet) => {
      const info: PuppetInfo = {
        id: puppet.pId,
        activeWorkerState: puppet.workerState,
      };
      return info;
    }),
  };

  return startedResponse;
};

const forwardEventToPuppet = (puppet: Puppet, event: DispatchableEvent) => {
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

  const exitResponse: ReceivableEvent = {
    code: 'PUPPETMASTER_EXIT_COMPLETED',
    payload: {},
    puppetInfo: localState.puppets.map((puppet) => {
      const info: PuppetInfo = {
        id: puppet.pId,
        activeWorkerState: puppet.workerState,
      };
      return info;
    }),
  };

  return exitResponse;
};

const respondToPuppetMaster = (response: ReceivableEventPuppet) => {
  const responseWithPuppetInfo: ReceivableEvent = {
    code: response.code,
    payload: response.payload,
    puppetInfo: localState.puppets.map((puppet) => {
      const info: PuppetInfo = {
        id: puppet.pId,
        activeWorkerState: puppet.workerState,
      };
      return info;
    }),
  };

  parentPort?.postMessage(responseWithPuppetInfo);
};
