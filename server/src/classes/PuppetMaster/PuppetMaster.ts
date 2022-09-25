import { ChildProcess, fork } from 'child_process';
import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { Worker, WorkerOptions } from 'worker_threads';
import { PuppetMasterAction, PuppetMasterWorkerResponse } from './types';

export class PuppetMaster {
  public static instance: PuppetMaster;
  public pmId: string;
  private worker: Worker;
  private numberOfMaintainedPuppets = 2;

  /** Master list of all connected users */
  public puppets: string[];

  constructor(socketId: string) {
    PuppetMaster.instance = this;
    this.puppets = [];
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
    console.log('Killing PUPPET_MASTER with id: ', this.pmId);
    this.action({
      command: 'EXIT',
      payload: {},
    });
  }

  private action(payload: PuppetMasterAction) {
    this.worker.postMessage(payload);
  }

  private async handleWorkerResponse(response: PuppetMasterWorkerResponse) {
    console.log(
      `PUPPET_MASTER_THREAD with id ${this.pmId} sent message to parent class: `,
      response
    );
    switch (response.code) {
      case 'OTHER':
        // code block
        return;

      case 'START_COMPLETED':
        console.log(`PUPPET_MASTER_THREAD with id ${this.pmId} was started`);
        return;
      case 'EXIT_COMPLETED':
        await this.worker.terminate();
        console.log(`PUPPET_MASTER_THREAD with id ${this.pmId} was terminated`);
        return;
      default:
        return;
    }
  }
}
