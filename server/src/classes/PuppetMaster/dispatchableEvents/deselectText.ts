import waitUntil from 'async-wait-until';
import {
  DispatchableEvent,
  DispatchableEventPayload_DeselectText,
  PuppetInfo,
  PuppetMasterWorkerState,
  ReceivableEvent,
  ReceivableEventPayload_PuppetDeselectTextCompleted,
  ReceivableEventPayload_PuppetDeselectTextStarted,
  ReceivableEventPuppet,
} from '../../../types';
import { Puppet } from '../../Puppet/Puppet';

const deselectText = async (
  event: DispatchableEvent,
  respondToPuppetMaster: (response: ReceivableEventPuppet) => void,
  getLocalState: () => PuppetMasterWorkerState,
  dequeueFirstPuppet: () => Puppet | undefined,
  restockPuppetQueue: (pmId: string, numberOfMaintainedPuppets: number) => void
) => {
  // respond: deselect text started

  const startedPayload: ReceivableEventPayload_PuppetDeselectTextStarted = {};
  const startedResponse: ReceivableEvent = {
    code: 'PUPPET_DESELECT_TEXT_STARTED',
    payload: startedPayload,
    puppetInfo: getLocalState().puppets.map((puppet) => {
      const info: PuppetInfo = {
        id: puppet.pId,
        activeWorkerState: puppet.workerState,
      };
      return info;
    }),
  };

  respondToPuppetMaster(startedResponse);

  // dequeue first puppet

  const inactivePuppet = dequeueFirstPuppet();

  const { id, numberOfMaintainedPuppets } =
    event.payload as DispatchableEventPayload_DeselectText;

  // restock puppets
  restockPuppetQueue(id, numberOfMaintainedPuppets);

  await waitUntil(
    () =>
      getLocalState().puppets[0].workerState.stateName ===
      'waitingForSelectText',
    {
      intervalBetweenAttempts: 10,
      timeout: 15000,
    }
  );

  // respond: deselect text completed
  const payload: ReceivableEventPayload_PuppetDeselectTextCompleted = {};
  const response: ReceivableEvent = {
    code: 'PUPPET_DESELECT_TEXT_COMPLETED',
    payload: payload,
    puppetInfo: getLocalState().puppets.map((puppet) => {
      const info: PuppetInfo = {
        id: puppet.pId,
        activeWorkerState: puppet.workerState,
      };
      return info;
    }),
  };

  respondToPuppetMaster(response);

  // kill inactive puppet

  setTimeout(() => {
    console.log('waited for 8 seconds, now killing inactive puppet');
    inactivePuppet?.kill();
  }, 8000);
};

export default deselectText;
