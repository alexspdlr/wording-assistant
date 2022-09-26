import { Worker } from 'worker_threads';
import { PuppetInfo } from '../../types/puppet';
import {
  PuppetMasterAction,
  PuppetMasterWorkerResponse,
} from '../../types/puppetMaster';

export class PuppetMaster {
  public static instance: PuppetMaster;
  public pmId: string;
  private worker: Worker;
  private numberOfMaintainedPuppets = 2;
  public puppetInfos: PuppetInfo[];

  constructor(socketId: string) {
    PuppetMaster.instance = this;
    this.puppetInfos = [];
    this.worker = new Worker('./src/classes/PuppetMaster/worker.ts', {
      execArgv: ['--require', 'ts-node/register'],
    });

    this.pmId = socketId;

    this.startWorkerListeners(this.worker);

    this.action({
      command: 'START',
      payload: {
        id: this.pmId,
        numberOfMaintainedPuppets: this.numberOfMaintainedPuppets,
      },
    });
  }

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response) => {
      await this.handleWorkerResponse(response);
    });
  }

  public kill() {
    this.action({
      command: 'EXIT',
      payload: {},
    });
  }

  private updatePuppetInfos = (puppetInfos: PuppetInfo[]) => {
    /*
    console.log('-------------------');
    console.log(
      `PuppetInfos of PUPPET_MASTER with id : ${this.pmId} were updated.`
    );
    console.log(`BEFORE: `, this.puppetInfos);
    */
    this.puppetInfos = puppetInfos;
    /*
    console.log(`AFTER: `, puppetInfos);
    console.log(
      `PuppetInfos of PUPPET_MASTER with id : ${this.pmId} were updated.`
    );
    console.log('-------------------');
    */
  };

  private action(payload: PuppetMasterAction) {
    this.worker.postMessage(payload);
  }

  private async handleWorkerResponse(response: PuppetMasterWorkerResponse) {
    this.updatePuppetInfos(response.payload);

    switch (response.code) {
      case 'OTHER':
        return;

      case 'START_COMPLETED':
        return;
      case 'EXIT_COMPLETED':
        await this.worker.terminate();
        return;
      default:
        return;
    }
  }
}
