import { ChildProcess, fork } from 'child_process';
import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { Worker, WorkerOptions } from 'worker_threads';
import {
  PuppetDispatchableEvent,
  PuppetReceivableEvent,
  PuppetState,
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
    this.puppetState = {
      stateName: 'processingInitialize',
      data: {},
    };
    this.dispatchEvent({
      command: 'START_PUPPET',
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
    this.puppetState = {
      stateName: 'processingTerminate',
      data: {},
    };
    this.dispatchEvent({
      command: 'EXIT_PUPPET',
      payload: {},
    });
  }

  public dispatchEvent(event: PuppetDispatchableEvent) {
    console.log('1');
    this.worker.postMessage({ event });
  }

  private async handleWorkerResponse(response: PuppetReceivableEvent) {
    switch (response.code) {
      case 'PUPPET_OTHER_ACTION_COMPLETED':
        // code block
        return;

      case 'PUPPET_START_COMPLETED':
        this.puppetState = {
          stateName: 'waitingForSelectText',
          data: {},
        };
        this.workerStarted = true;
        return;
      case 'PUPPET_EXIT_COMPLETED':
        await this.worker.terminate();
        this.workerTerminated = true;
        return;
      default:
        return;
    }
  }
}
