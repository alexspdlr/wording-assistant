import { ChildProcess, fork } from 'child_process';
import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { Worker, WorkerOptions } from 'worker_threads';
import { PuppetAction } from './types';

export class Puppet {
  public static instance: Puppet;
  public pId: number;
  public parentId: string;
  private worker: Worker;

  constructor(parentId: string) {
    Puppet.instance = this;
    this.worker = new Worker('./src/classes/Puppet/worker.ts', {
      execArgv: ['--require', 'ts-node/register'],
    });

    this.pId = this.worker.threadId;
    this.parentId = parentId;

    this.startWorkerListeners(this.worker);

    this.action({
      command: 'START',
      payload: { id: this.pId },
    });
  }

  private startWorkerListeners(worker: Worker) {
    worker.on('message', (message) => {
      console.log(
        `PUPPET_THREAD with id ${this.pId} sent message to parent class: `,
        message
      );
    });
  }

  public setup() {
    console.log('Preparing PUPPET with id: ', this.pId);
  }

  public kill() {
    console.log('Killing PUPPET with id: ', this.pId);
    this.worker.terminate();
  }

  private action(payload: PuppetAction) {
    this.worker.postMessage(payload);
  }
}
