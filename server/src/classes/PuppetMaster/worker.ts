import { Browser, Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import { Puppet } from '../Puppet/Puppet';
import { PuppetMasterAction } from './types';

console.info('Spawned a PUPPET_MASTER_WORKER');

parentPort?.on('message', async (action: PuppetMasterAction) => {
  const response = await executeAction(action);

  if (response) {
    parentPort?.postMessage(response);
  }
});

const executeAction = async (action: PuppetMasterAction): Promise<any> => {
  switch (action.command) {
    case 'OTHER':
      // code block
      return;

    case 'START':
      const { id, numberOfMaintainedPuppets } = action.payload;

      setTimeout(() => {
        console.log(`Started PUPPET_MASTER_WORKER with id: ${id}`);
      }, 2000);

      const puppets = [...Array(numberOfMaintainedPuppets)].map(
        () => new Puppet(id)
      );

      return puppets.map((puppet) => puppet.pId);

    case 'EXIT':
      // code block
      break;
    default:
      return;
  }
};
