import { Worker } from 'worker_threads';
import { DispatchableEvent, ReceivableEvent } from '../../types/index';
import { ActiveWorkerState } from '../../types/socket';

export class Puppet {
  public static instance: Puppet;
  public pId: number;
  public parentId: string;
  public workerTerminated: boolean;
  public workerStarted: boolean;
  public workerState: ActiveWorkerState;
  private worker: Worker;
  private respondToPuppetMaster: (response: ReceivableEvent) => void;

  constructor(
    parentId: string,
    respondToPuppetMaster: (response: ReceivableEvent) => void
  ) {
    Puppet.instance = this;
    this.worker = new Worker('./src/classes/Puppet/worker.ts', {
      execArgv: ['--require', 'ts-node/register'],
    });
    this.pId = this.worker.threadId;
    this.parentId = parentId;
    this.workerTerminated = false;
    this.workerStarted = false;
    this.respondToPuppetMaster = respondToPuppetMaster;
    this.startWorkerListeners(this.worker);
    this.workerState = {
      stateName: 'processingInitialize',
      data: {},
    };
    this.dispatchEvent({
      command: 'START_PUPPET',
      payload: { id: this.pId },
    });
  }

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response: ReceivableEvent) => {
      await this.handleWorkerResponse(response);
    });

    worker.on('exit', (code) => {
      // do something
    });
  }

  public kill() {
    this.workerState = {
      stateName: 'processingTerminate',
      data: {},
    };
    this.dispatchEvent({
      command: 'EXIT_PUPPET',
      payload: {},
    });
  }

  public dispatchEvent(event: DispatchableEvent) {
    this.worker.postMessage(event);
  }

  private async handleWorkerResponse(response: ReceivableEvent) {
    switch (response.code) {
      case 'PUPPET_SELECT_TEXT_COMPLETED':
        this.workerState = {
          stateName: 'waitingForSelectWord',
          data: {
            rephrasingBase: response.payload.rephrasingBase,
          },
        };
        this.respondToPuppetMaster(response);
        return;

      case 'PUPPET_START_COMPLETED':
        this.workerState = {
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
