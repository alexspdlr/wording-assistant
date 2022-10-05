import waitUntil from 'async-wait-until';
import { Worker } from 'worker_threads';
import {
  ClientActionEvent_Extended,
  ServerResponseEvent_Extended,
} from '../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateName,
  ClientActionEvent,
  ServerResponseEvent,
} from '../../types/socket';
import { EventManager } from '../EventManager/EventManager';
import generateDefaultWorkerState from '../ServerSocket/util/generateDefaultWorkerState';

export class Puppet {
  public static instance: Puppet;
  public id: string;
  public workerTerminated: boolean;
  public workerStarted: boolean;
  public workerState: ActiveWorkerState;
  private worker: Worker;
  private respondToSocket: (response: ServerResponseEvent) => void;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

  constructor(
    id: string,
    respondToSocket: (response: ServerResponseEvent) => void
  ) {
    Puppet.instance = this;
    this.worker = new Worker('./src/classes/Puppet/worker.ts', {
      execArgv: ['--require', 'ts-node/register'],
    });
    this.id = id;
    this.workerTerminated = false;
    this.workerStarted = false;
    this.respondToSocket = respondToSocket;
    this.startWorkerListeners(this.worker);
    this.workerState = generateDefaultWorkerState('start', id);

    // send start event to client
    const startEvent: ClientActionEvent_Extended = {
      endpoint: 'startWorker',
      payload: { id: this.id },
    };
    this.worker.postMessage(startEvent);
  }

  /* ----------------------------- PUBLIC METHODS ----------------------------- */

  public kill() {
    this.workerState = generateDefaultWorkerState('exit', this.id);
    const exitEvent: ClientActionEvent_Extended = {
      endpoint: 'terminateWorker',
      payload: {},
    };
    this.worker.postMessage(exitEvent);
  }

  public dispatchEvent(event: ClientActionEvent) {
    this.worker.postMessage(event);
  }

  public async assignPuppet(
    socketId: string,
    respondToClient: (response: ServerResponseEvent) => void
  ) {
    this.id = socketId;
    this.respondToSocket = respondToClient;

    await waitUntil(
      () => this.workerState.stateName === 'waitingForSelectText'
    );

    this.respondToSocket({
      endpoint: 'setupCompleted',
      workerState: this.workerState,
    });
  }

  /* ----------------------------- PRIVATE METHODS ---------------------------- */

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response: ServerResponseEvent) => {
      await this.handleWorkerResponse(response);
    });
  }

  private async handleWorkerResponse(event: ServerResponseEvent_Extended) {
    if (event.endpoint === 'setupCompleted') {
      this.workerStarted = true;
    }

    if (event.endpoint === 'exitCompleted') {
      this.workerTerminated = true;
      await this.worker.terminate();
      return;
    }

    const eventData = event.workerState.data;
    this.updateWorkerState(event.workerState.stateName, {
      originalText: eventData.originalText ? eventData.originalText : undefined,
      targetText: eventData.targetText ? eventData.targetText : undefined,
      cursorIndex: eventData.cursorIndex ? eventData.cursorIndex : undefined,
      rephrasingOptions: eventData.rephrasingOptions
        ? eventData.rephrasingOptions
        : undefined,
    });

    this.respondToSocket(event as ServerResponseEvent);
  }

  private updateWorkerState = (
    stateName: ActiveWorkerStateName,
    updateObject: {
      originalText?: string;
      targetText?: string;
      cursorIndex?: number;
      rephrasingOptions?: string[];
    }
  ) => {
    this.workerState.stateName = stateName;

    if (updateObject.originalText) {
      this.workerState.data.originalText = updateObject.originalText;
    }

    if (updateObject.targetText) {
      this.workerState.data.targetText = updateObject.targetText;
    }

    if (updateObject.cursorIndex) {
      this.workerState.data.cursorIndex = updateObject.cursorIndex;
    }

    if (updateObject.rephrasingOptions) {
      this.workerState.data.rephrasingOptions = updateObject.rephrasingOptions;
    }

    return;
  };
}
