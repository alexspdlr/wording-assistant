import waitUntil from 'async-wait-until';
import { Worker } from 'worker_threads';
import {
  DispatchableEvent,
  DispatchableEventPayload_Start,
  ReceivableEvent,
  ReceivableEventWorker,
} from '../../types/index';
import { ActiveWorkerState } from '../../types/socket';
import deselectTextCompleted from './receivableEvents/deselectTextCompleted';
import deselectTextStarted from './receivableEvents/deselectTextStarted';
import exitCompleted from './receivableEvents/exitCompleted';
import moveCursorCompleted from './receivableEvents/moveCursorCompleted';
import moveCursorStarted from './receivableEvents/moveCursorStarted';
import selectTextCompleted from './receivableEvents/selectTextCompleted';
import selectTextStarted from './receivableEvents/selectTextStarted';
import startCompleted from './receivableEvents/startCompleted';
import updateTargetTextCompleted from './receivableEvents/updateTargetTextCompleted';
import updateTargetTextStarted from './receivableEvents/updateTargetTextStarted';

export class Puppet {
  public static instance: Puppet;
  public id: string;
  public workerTerminated: boolean;
  public workerStarted: boolean;
  public workerState: ActiveWorkerState;
  private worker: Worker;
  private respondToSocket: (response: ReceivableEvent) => void;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

  constructor(
    id: string,
    respondToSocket: (response: ReceivableEvent) => void
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
    this.workerState = {
      stateName: 'processingInitialize',
      data: {},
    };

    const eventPayload: DispatchableEventPayload_Start = { id: this.id };
    this.dispatchEvent({
      command: 'START',
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
      command: 'EXIT',
      payload: {},
    });
  }

  public dispatchEvent(event: DispatchableEvent) {
    this.worker.postMessage(event);
  }

  public async assignPuppet(
    socketId: string,
    respondToClient: (response: ReceivableEvent) => void
  ) {
    this.id = socketId;
    this.respondToSocket = respondToClient;

    await waitUntil(
      () => this.workerState.stateName === 'waitingForSelectText'
    );

    this.respondToSocket({
      code: 'START_COMPLETED',
      payload: {},
      workerState: this.workerState,
    });
  }

  /* ----------------------------- PRIVATE METHODS ---------------------------- */

  private startWorkerListeners(worker: Worker) {
    worker.on('message', async (response: ReceivableEventWorker) => {
      await this.handleWorkerResponse(response);
    });
  }

  private updateWorkerState = (newState: ActiveWorkerState) => {
    this.workerState = newState;
    return;
  };

  private async handleWorkerResponse(response: ReceivableEventWorker) {
    switch (response.code) {
      case 'SELECT_TEXT_STARTED':
        selectTextStarted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          this.respondToSocket
        );
        return;

      case 'SELECT_TEXT_COMPLETED':
        selectTextCompleted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          this.respondToSocket
        );
        return;

      case 'MOVE_CURSOR_STARTED':
        moveCursorStarted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          this.respondToSocket
        );
        return;

      case 'MOVE_CURSOR_COMPLETED':
        moveCursorCompleted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          this.respondToSocket
        );
        return;

      case 'UPDATE_TARGET_TEXT_STARTED':
        updateTargetTextStarted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          this.respondToSocket
        );
        return;

      case 'UPDATE_TARGET_TEXT_COMPLETED':
        updateTargetTextCompleted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          this.respondToSocket
        );
        return;

      case 'DESELECT_TEXT_STARTED':
        deselectTextStarted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          this.respondToSocket
        );
        return;

      case 'DESELECT_TEXT_COMPLETED':
        deselectTextCompleted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          this.respondToSocket
        );
        return;

      case 'START_COMPLETED':
        startCompleted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          this.updateWorkerState,
          () => (this.workerStarted = true),
          this.respondToSocket
        );
        return;

      case 'EXIT_COMPLETED':
        await exitCompleted(
          {
            code: response.code,
            payload: response.payload,
            workerState: this.workerState,
          },
          () => this.worker.terminate(),
          () => (this.workerTerminated = true),
          this.respondToSocket
        );

        return;
      default:
        return;
    }
  }
}
