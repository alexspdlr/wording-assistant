import { randomUUID } from 'crypto';
import { ClientActionEvent_Extended } from '../../types';
import { ActiveWorkerState, ClientActionEndpoint } from '../../types/socket';

interface QueueEvent {
  event: ClientActionEvent_Extended;
  id: string;
  priority: 1 | 2 | 3 | 4;
  retryTimeout: number;
  preconditionFulfilled: () => boolean;
}

export class EventManager {
  public static instance: EventManager;
  public pendingEvent: QueueEvent | null;
  private processEvent: (event: ClientActionEvent_Extended) => void;
  private getActiveWorkerState: () => ActiveWorkerState;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

  constructor(
    processEvent: (event: ClientActionEvent_Extended) => void,
    getActiveWorkerState: () => ActiveWorkerState
  ) {
    this.pendingEvent = null;
    this.processEvent = processEvent;
    this.getActiveWorkerState = getActiveWorkerState;
  }

  /* ----------------------------- PUBLIC METHODS ----------------------------- */

  public handleNewEvent(event: ClientActionEvent_Extended) {
    const queueEvent: QueueEvent = {
      priority: determineEventPriority(event.endpoint),
      event: event,
      retryTimeout: determineRetryTimeout(event.endpoint),
      id: randomUUID(),
      preconditionFulfilled: detemineIfPreconditionFulfilled(
        event.endpoint,
        this.getActiveWorkerState
      ),
    };

    // if event queue already contains event with higher priority
    if (this.pendingEvent && this.pendingEvent.priority > queueEvent.priority) {
      console.log(
        `'${queueEvent.event.endpoint}' not queued, because an other pending event had a higher priority`
      );
      return;
    }

    this.pendingEvent = queueEvent;

    this.processEventWhenPreconditionFulfilled(queueEvent.id, Date.now());
  }

  private processEventWhenPreconditionFulfilled(
    targetEventId: string,
    startTime: number
  ) {
    const targetEvent = this.pendingEvent;

    // stop if target event of this retry cycle doesnt exist anymore
    if (!targetEvent || targetEvent.id !== targetEventId) {
      console.log(`Event not found - Exit due to OVERWRITE`);
      return;
    }

    // stop if timed out
    if (Date.now() - startTime >= targetEvent.retryTimeout) {
      console.log(
        `${targetEvent?.event.endpoint} (${targetEvent?.id}) - Exit due to TIMEOUT`
      );
      return;
    }

    // stop (process) if precondition fulfilled
    if (targetEvent.preconditionFulfilled()) {
      console.log(
        `${targetEvent?.event.endpoint} (${targetEvent?.id}) - Exit due to SUCCESS`
      );
      this.processEvent(targetEvent.event);

      if (this.pendingEvent?.id === targetEventId) {
        this.pendingEvent = null;
      }

      return;
    }

    // retry if none of the above conditions were fulfilled

    setTimeout(() => {
      this.processEventWhenPreconditionFulfilled(targetEventId, startTime);
    }, 50);

    return;
  }
}

/* ---------------------------------- utils --------------------------------- */

const detemineIfPreconditionFulfilled = (
  endpoint: ClientActionEndpoint | 'startWorker' | 'terminateWorker',
  currentActiveWorkerState: () => ActiveWorkerState
): (() => boolean) => {
  switch (endpoint) {
    case 'selectText':
      return () => currentActiveWorkerState().stateName.startsWith('waiting');
    case 'deselectText':
      return () => currentActiveWorkerState().stateName.startsWith('waiting');
    case 'moveCursor':
      return () =>
        currentActiveWorkerState().stateName === 'waitingForTargetTextAction';
    case 'updateTargetText':
      return () =>
        currentActiveWorkerState().stateName === 'waitingForTargetTextAction';

    case 'selectWordingAlternative':
      return () =>
        currentActiveWorkerState().stateName === 'waitingForTargetTextAction';

    case 'startWorker':
      return () => true;
    case 'terminateWorker':
      return () => true;

    default:
      return () => false;
  }
};

const determineEventPriority = (
  endpoint: ClientActionEndpoint | 'startWorker' | 'terminateWorker'
): 1 | 2 | 3 | 4 => {
  if (endpoint === 'moveCursor') {
    return 1;
  }
  if (
    endpoint === 'updateTargetText' ||
    endpoint === 'selectWordingAlternative'
  ) {
    return 2;
  }

  if (endpoint === 'selectText' || endpoint === 'deselectText') {
    return 3;
  }

  return 4;
};

const determineRetryTimeout = (
  endpoint: ClientActionEndpoint | 'startWorker' | 'terminateWorker'
): number => {
  switch (endpoint) {
    case 'selectText':
      return 8000;
    case 'deselectText':
      return 3000;

    case 'moveCursor':
      return 3000;

    case 'updateTargetText':
      return 5000;

    case 'selectWordingAlternative':
      return 5000;

    default:
      return 3000;
  }
};
