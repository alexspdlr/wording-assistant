/* eslint-disable @typescript-eslint/ban-types */
import { Worker } from 'worker_threads';
import {
  DispatchableEvent,
  PuppetInfo,
  ReceivableEvent,
  ReceivableEventPuppet,
} from '../../types';
import { SocketServerEvent } from '../../types/socket';

export class PuppetMaster {
  public static instance: PuppetMaster;
  public pmId: string;
  private worker: Worker;
  private numberOfMaintainedPuppets = 2;
  public puppetInfos: PuppetInfo[];
  private respondToClient: (event: ReceivableEventPuppet) => void;

  // CONSTRUCTOR
  constructor(
    socketId: string,
    respondToClient: (event: ReceivableEventPuppet) => void
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
    worker.on('message', async (response: ReceivableEventPuppet) => {
      console.log('000000000000000 handling response in PuppetMaster');
      await this.handleWorkerResponse(response);
    });
  }

  private updatePuppetInfos = (puppetInfos: PuppetInfo[]) => {
    this.puppetInfos = puppetInfos;
  };

  private dispatchEvent(event: DispatchableEvent) {
    this.worker.postMessage(event);
  }

  private async handleWorkerResponse(response: ReceivableEventPuppet) {
    console.log('ABC', JSON.stringify(response));

    this.updatePuppetInfos(response.payload as PuppetInfo[]);

    /*
    Issue: start passes puppetInfo as payload (which alwasy required to inform 
    puppet master about state of puppets), but other methods need to pass the client event as well 
    */

    // -> USE: Type ReceivableEventPuppet for that communication

    console.log(
      `${response.code} - PAYLOAD: `,
      response.payload,
      `, PUPPET_INFO: `,
      response.puppetInfo[0].activeWorkerState
    );

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
