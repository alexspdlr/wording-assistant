/* eslint-disable @typescript-eslint/ban-types */
import { Worker } from 'worker_threads';
import {
  DispatchableEvent,
  DispatchableEventPayload_ExitPuppet,
  DispatchableEventPayload_StartPuppetMaster,
  PuppetInfo,
  ReceivableEvent,
} from '../../types';
import { SocketServerEvent } from '../../types/socket';

export class PuppetMaster {
  public static instance: PuppetMaster;
  public pmId: string;
  private worker: Worker;
  public numberOfMaintainedPuppets = 3;
  public puppetInfos: PuppetInfo[];
  private respondToClient: (event: ReceivableEvent) => void;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

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

    const payload: DispatchableEventPayload_StartPuppetMaster = {
      id: this.pmId,
      numberOfMaintainedPuppets: this.numberOfMaintainedPuppets,
    };

    this.dispatchEvent({
      command: 'START_PUPPETMASTER',
      payload,
    });
  }

  /* ----------------------------- PUBLIC METHODS ----------------------------- */

  public kill() {
    const payload: DispatchableEventPayload_ExitPuppet = {};

    this.dispatchEvent({
      command: 'EXIT_PUPPETMASTER',
      payload,
    });
  }

  public dispatchEvent(event: DispatchableEvent) {
    this.worker.postMessage(event);
  }

  /* ----------------------------- PRIVATE METHODS ---------------------------- */

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response: ReceivableEvent) => {
      await this.handleWorkerResponse(response);
    });
  }

  private updatePuppetInfos = (puppetInfos: PuppetInfo[]) => {
    this.puppetInfos = puppetInfos;
  };

  private async handleWorkerResponse(response: ReceivableEvent) {
    this.updatePuppetInfos(response.puppetInfo as PuppetInfo[]);

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
