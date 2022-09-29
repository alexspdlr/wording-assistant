import { Worker } from 'worker_threads';
import {
  DispatchableEvent,
  DispatchableEventPayload_StartPuppet,
  ReceivableEventPuppet,
} from '../../types/index';
import { ActiveWorkerState } from '../../types/socket';
import exitCompleted from './receivableEvents/exitCompleted';
import selectTextCompleted from './receivableEvents/selectTextCompleted';
import selectTextStarted from './receivableEvents/selectTextStarted';
import startCompleted from './receivableEvents/startCompleted';

export class Puppet {
  public static instance: Puppet;
  public pId: number;
  public parentId: string;
  public workerTerminated: boolean;
  public workerStarted: boolean;
  public workerState: ActiveWorkerState;
  private worker: Worker;
  private respondToPuppetMaster: (response: ReceivableEventPuppet) => void;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

  constructor(
    parentId: string,
    respondToPuppetMaster: (response: ReceivableEventPuppet) => void
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

    const eventPayload: DispatchableEventPayload_StartPuppet = { id: this.pId };
    this.dispatchEvent({
      command: 'START_PUPPET',
      payload: eventPayload,
    });
  }

  /* ----------------------------- PUBLIC METHODS ----------------------------- */

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

  /* ----------------------------- PRIVATE METHODS ---------------------------- */

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response: ReceivableEventPuppet) => {
      await this.handleWorkerResponse(response);
    });
  }

  private updateWorkerState = (newState: ActiveWorkerState) => {
    this.workerState = newState;
    return;
  };

  private async handleWorkerResponse(response: ReceivableEventPuppet) {
    switch (response.code) {
      case 'PUPPET_SELECT_TEXT_STARTED':
        selectTextStarted(
          response,
          this.updateWorkerState,
          this.respondToPuppetMaster
        );
        return;

      case 'PUPPET_SELECT_TEXT_COMPLETED':
        selectTextCompleted(
          response,
          this.updateWorkerState,
          this.respondToPuppetMaster
        );
        return;

      // don'T respond to parent in these cases

      case 'PUPPET_START_COMPLETED':
        startCompleted(
          this.updateWorkerState,
          () => (this.workerStarted = true)
        );
        return;

      case 'PUPPET_EXIT_COMPLETED':
        await exitCompleted(
          () => this.worker.terminate(),
          () => (this.workerTerminated = true)
        );

        return;
      default:
        return;
    }
  }
}
