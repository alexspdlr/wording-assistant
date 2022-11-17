import waitUntil from 'async-wait-until';
import { Worker } from 'worker_threads';
import {
  ClientActionEvent_Extended,
  ServerResponseEvent_Extended,
} from '../../types';
import {
  ActiveWorkerState,
  ClientActionEvent,
  ServerResponseEvent,
} from '../../types/socket';
import generateDefaultWorkerState from '../ServerSocket/util/generateDefaultWorkerState';

/**
 *
 *  An object of the puppet class is responsible for exactly one client. It:
 *
 *    - manages exactly one worker thread, in which puppeteer executes client-action-events
 *
 *    - synchronises information about the puppet with the state of the associated worker thread
 *
 *    - facilitates communication between the parent thread and the worker thread
 *
 *    - starts the worker thread when the client connects & kills it when the client disconnects
 *
 */

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

    const startEvent: ClientActionEvent_Extended = {
      endpoint: 'startWorker',
      payload: { workerId: this.id },
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

      payload: {
        eventId: '',
        workerState: this.workerState,
      },
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

    console.log('EVENT: ', event.payload);

    this.updateWorkerState(event.payload.workerState);

    this.respondToSocket(event as ServerResponseEvent);
  }

  private updateWorkerState = (newState: ActiveWorkerState) => {
    this.workerState = newState;

    return;
  };
}
