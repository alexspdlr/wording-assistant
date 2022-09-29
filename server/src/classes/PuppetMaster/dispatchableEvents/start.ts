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

const start = async (
  event: DispatchableEvent,
  respondToPuppetMaster: (response: ReceivableEventPuppet) => void,
  localState: PuppetMasterWorkerState,
  updateLocalState: (puppets: Puppet[]) => void
) => {
  const { id, numberOfMaintainedPuppets } =
    event.payload as DispatchableEventPayload_StartPuppetMaster;

  const puppets = [...Array(numberOfMaintainedPuppets)].map(
    () => new Puppet(id, respondToPuppetMaster)
  );

  updateLocalState(puppets);

  // update state in parent after 1st worker started
  await waitUntil(() => localState.puppets[0].workerStarted === true);

  // update state in parent after all workers started
  await waitUntil(
    () =>
      localState.puppets.filter((puppet) => puppet.workerStarted === false)
        .length === 0
  );

  const response: ReceivableEvent = {
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

  respondToPuppetMaster(response);
};

export default start;
