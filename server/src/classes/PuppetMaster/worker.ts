import { parentPort } from 'worker_threads';
import {
  DispatchableEvent,
  PuppetInfo,
  PuppetMasterWorkerState,
  ReceivableEvent,
  ReceivableEventPuppet,
} from '../../types/index';
import { Puppet } from '../Puppet/Puppet';
import exit from './dispatchableEvents/exit';
import start from './dispatchableEvents/start';

/* ---------------------------------- STATE --------------------------------- */

const localState: PuppetMasterWorkerState = {
  puppets: [],
};

const updateLocalState = (puppets: Puppet[]) => {
  localState.puppets = puppets;
};

/* ----------------------- CROSS THREAD COMMUNICATION ----------------------- */

parentPort?.on('message', async (event: DispatchableEvent) => {
  handleDispatchableEvent(event);
});

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

/* ------------------------------ HANDLE EVENTS ----------------------------- */

const handleDispatchableEvent = async (event: DispatchableEvent) => {
  if (event.command !== 'START_PUPPETMASTER' && !localState.puppets[0]) return;

  const targetPuppet: Puppet = localState.puppets[0];

  switch (event.command) {
    case 'START_PUPPETMASTER':
      await start(event, respondToPuppetMaster, localState, updateLocalState);
      return;

    case 'EXIT_PUPPETMASTER':
      await exit(respondToPuppetMaster, localState);
      return;

    default:
      forwardEventToPuppet(targetPuppet, event);
      return;
  }
};

const forwardEventToPuppet = (puppet: Puppet, event: DispatchableEvent) => {
  puppet.dispatchEvent(event);
};
