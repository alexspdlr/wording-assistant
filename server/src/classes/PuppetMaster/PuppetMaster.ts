/* eslint-disable @typescript-eslint/ban-types */
import { Worker } from 'worker_threads';
import { DispatchableEvent, PuppetInfo, ReceivableEvent } from '../../types';

export class PuppetMaster {
  public static instance: PuppetMaster;
  public pmId: string;
  private worker: Worker;
  private numberOfMaintainedPuppets = 2;
  public puppetInfos: PuppetInfo[];
  private respondToClient: (event: ReceivableEvent) => void;

  // CONSTRUCTOR
  constructor(
    socketId: string,
    respondToClient: (event: ReceivableEvent) => void
  ) {
    PuppetMaster.instance = this;
    this.puppetInfos = [];
    this.worker = new Worker('./src/classes/PuppetMaster/worker.ts', {
      execArgv: ['--require', 'ts-node/register'],
    });

    this.pmId = socketId;
    this.respondToClient = respondToClient;

    this.startWorkerListeners(this.worker);

    this.dispatchEvent({
      command: 'START_PUPPETMASTER',
      payload: {
        id: this.pmId,
        numberOfMaintainedPuppets: this.numberOfMaintainedPuppets,
      },
    });
  }

  // PUBLIC METHODS

  public kill() {
    this.dispatchEvent({
      command: 'EXIT_PUPPETMASTER',
      payload: {},
    });
  }

  public forwardClientEvent(event: DispatchableEvent) {
    this.dispatchEvent(event);
  }

  // PRIVATE METHODS

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response: ReceivableEvent) => {
      await this.handleWorkerResponse(response);
    });
  }

  private updatePuppetInfos = (puppetInfos: PuppetInfo[]) => {
    this.puppetInfos = puppetInfos;
  };

  private dispatchEvent(event: DispatchableEvent) {
    this.worker.postMessage(event);
  }

  private async handleWorkerResponse(response: ReceivableEvent) {
    this.updatePuppetInfos(response.payload as PuppetInfo[]);

    console.log(`${response.code}: `, response.payload);

    switch (response.code) {
      case 'PUPPETMASTER_EXIT_COMPLETED':
        await this.worker.terminate();
        return;
      default:
        this.respondToClient(response);
        return;
    }
  }
}
