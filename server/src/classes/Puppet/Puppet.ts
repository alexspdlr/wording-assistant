import { ChildProcess, fork } from 'child_process';
import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { Worker, WorkerOptions } from 'worker_threads';
import {
  PuppetAction,
  PuppetState,
  PuppetWorkerResponse,
} from '../../types/puppet';

export class Puppet {
  public static instance: Puppet;
  public pId: number;
  public parentId: string;
  public workerTerminated: boolean;
  public workerStarted: boolean;
  public puppetState: PuppetState;
  private worker: Worker;

  constructor(parentId: string) {
    Puppet.instance = this;
    this.worker = new Worker('./src/classes/Puppet/worker.ts', {
      execArgv: ['--require', 'ts-node/register'],
    });
    this.pId = this.worker.threadId;
    this.parentId = parentId;
    this.workerTerminated = false;
    this.workerStarted = false;
    this.startWorkerListeners(this.worker);
    this.puppetState = 'initializing';
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
      // do something
    });
  }

  public kill() {
    this.puppetState = 'terminating';
    this.action({
      command: 'EXIT',
      payload: {},
    });
  }

  private action(payload: PuppetAction) {
    this.worker.postMessage(payload);
  }

  private async handleWorkerResponse(response: PuppetWorkerResponse) {
    switch (response.code) {
      case 'OTHER':
        // code block
        return;

      case 'START_COMPLETED':
        this.workerStarted = true;
        this.puppetState = 'waitingForSelectedText';
        return;
      case 'EXIT_COMPLETED':
        await this.worker.terminate();
        this.workerTerminated = true;
        return;
      default:
        return;
    }
  }
}
