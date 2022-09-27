import { Worker } from 'worker_threads';
import { PuppetInfo } from '../../types/puppet';
import {
  PuppetMasterDispatchableEvent,
  PuppetMasterReceivableEvent,
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

    this.dispatchEvent({
      command: 'START_PUPPETMASTER',
      payload: {
        id: this.pmId,
        numberOfMaintainedPuppets: this.numberOfMaintainedPuppets,
      },
    });
  }

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response: PuppetMasterReceivableEvent) => {
      await this.handleWorkerResponse(response);
    });
  }

  private updatePuppetInfos = (puppetInfos: PuppetInfo[]) => {
    this.puppetInfos = puppetInfos;
  };

  private dispatchEvent(event: PuppetMasterDispatchableEvent) {
    this.worker.postMessage(event);
  }

  private async handleWorkerResponse(response: PuppetMasterReceivableEvent) {
    this.updatePuppetInfos(response.payload);

    console.log(`${response.code}: `, response.payload);

    switch (response.code) {
      case 'PUPPETMASTER_OTHER_EVENT_COMPLETED':
        return;
      case 'PUPPETMASTER_ERROR_OCCURED':
        return;
      case 'PUPPETMASTER_START_COMPLETED':
        return;
      case 'PUPPETMASTER_EXIT_COMPLETED':
        await this.worker.terminate();
        return;
      default:
        return;
    }
  }

  public kill() {
    this.dispatchEvent({
      command: 'EXIT_PUPPETMASTER',
      payload: {},
    });
  }

  // puppet actions
  public selectText(inputText: string) {
    this.dispatchEvent({
      command: 'SELECT_TEXT',
      payload: {
        inputText,
      },
    });
  }

  /*

  public deselectText() {
    this.dispatchEvent({
      command: 'DESELECT_TEXT',
      payload: {},
    });
  }

  public selectWord() {
    this.dispatchEvent({
      command: 'SELECT_WORD',
      payload: {},
    });
  }

  public deselectWord() {
    this.dispatchEvent({
      command: 'DESELECT_WORD',
      payload: {},
    });
  }

  public selectWordingAlternative() {
    this.dispatchEvent({
      command: 'SELECT_WORDING_ALTERNATIVE',
      payload: {},
    });
  }
  */
}
