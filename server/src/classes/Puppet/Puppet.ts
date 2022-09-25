import { ChildProcess, fork } from 'child_process';
import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { Worker, WorkerOptions } from 'worker_threads';
import { PuppetAction, PuppetWorkerResponse } from './types';

export class Puppet {
  public static instance: Puppet;
  public pId: number;
  public parentId: string;
  public workerTerminated: boolean;
  private worker: Worker;

  constructor(parentId: string) {
    Puppet.instance = this;
    this.worker = new Worker('./src/classes/Puppet/worker.ts', {
      execArgv: ['--require', 'ts-node/register'],
    });
    this.pId = this.worker.threadId;
    this.parentId = parentId;
    this.workerTerminated = false;
    this.startWorkerListeners(this.worker);

    this.action({
      command: 'START',
      payload: { id: this.pId },
    });
  }

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response) => {
      await this.handleWorkerResponse(response);
    });

    worker.on('exit', (code) => {
      console.log(
        `PUPPET_THREAD with id ${this.pId} exit tracked in parent class`
      );
    });
  }

  public setup() {
    console.log('Preparing PUPPET with id: ', this.pId);
  }

  public kill() {
    console.log('Killing PUPPET with id: ', this.pId);
    this.action({
      command: 'EXIT',
      payload: {},
    });
  }

  private action(payload: PuppetAction) {
    this.worker.postMessage(payload);
  }

  private async handleWorkerResponse(response: PuppetWorkerResponse) {
    console.log(
      `PUPPET_THREAD with id ${this.pId} sent message to parent class: `,
      response
    );
    switch (response.code) {
      case 'OTHER':
        // code block
        return;

      case 'START_COMPLETED':
        console.log(`PUPPET_THREAD with id ${this.pId} was started`);
        return;
      case 'EXIT_COMPLETED':
        await this.worker.terminate();
        this.workerTerminated = true;
        console.log(`PUPPET_THREAD with id ${this.pId} was terminated`);
        return;
      default:
        return;
    }
  }
}
