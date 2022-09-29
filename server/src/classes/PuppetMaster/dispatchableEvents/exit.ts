import waitUntil from 'async-wait-until';
import {
  DispatchableEvent,
  DispatchableEventPayload_StartPuppetMaster,
  PuppetInfo,
  PuppetMasterWorkerState,
  ReceivableEvent,
  ReceivableEventPuppet,
} from '../../../types';
import { Puppet } from '../../Puppet/Puppet';

const exit = async (
  respondToPuppetMaster: (response: ReceivableEventPuppet) => void,
  localState: PuppetMasterWorkerState
) => {
  for (const puppet of localState.puppets) {
    puppet.kill();
  }

  await waitUntil(
    () =>
      localState.puppets.filter((puppet) => puppet.workerTerminated === false)
        .length === 0
  );

  const response: ReceivableEvent = {
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

  respondToPuppetMaster(response);
};

export default exit;
