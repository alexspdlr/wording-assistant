import { randomUUID } from 'crypto';
import { ClientActionEvent_Extended } from '../../types';
import {
  ActiveWorkerState,
  ClientActionEndpoint,
  ClientActionPayload,
} from '../../types/socket';
interface QueueEvent {
  event: ClientActionEvent_Extended;
  id: string;
  priority: 1 | 2 | 3 | 4;
  retryTimeout: number;
  preconditionFulfilled: () => boolean;
}

/**
 *
 *  An object of the EventManager class determines if and when a client-action-event is executed. It:
 *
 *     - receives client-action-events and assigns them a priority value, necessary preconditions for execution
 *       and a maximum retry duration based on their end point
 *
 *     - replaces the current pending client-action-event if a new incoming event has the same or a higher priority
 *
 *     - tries to execute the current pending client-action-event until (1) the execution succeeds, (2) the maximum
 *       retry duration is exceeded, or (3) a new client-action-event replaces the current one
 *
 *
 *  Example (for clarification & reasoning behind the mechanism):
 *
 *  Suppose: Currently pending is the event "moveCaret" (priority 1), which will first move the caret to the correct
 *  position and then provide the client with rephrasing alternatives. Before "moveCaret" can be executed, the EventManager
 *  receives the event "deselectText" (priority 3), which resets the entire rephrasing session of the client. Because of
 *  its higher priority, the event "deselectText" replaces the event "moveCaret" as the pending event and thus "moveCaret"
 *  will never be executed. This makes sense, as the client does not care which rephrasing options would have been offered in
 *  the aborted rephrasing session, as an active decision has been made to abort the entire process.
 *
 */

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
      id: ['startWorker', 'terminateWorker'].includes(event.endpoint)
        ? randomUUID()
        : (event.payload as ClientActionPayload).eventId,
      preconditionFulfilled: detemineIfPreconditionFulfilled(
        event.endpoint,
        this.getActiveWorkerState
      ),
    };

    // Return if the event queue already contains an event with a higher priority
    if (this.pendingEvent && this.pendingEvent.priority > queueEvent.priority) {
      console.log(
        `'${queueEvent.event.endpoint}' not queued, because an other pending event had a higher priority`
      );
      return;
    }

    this.pendingEvent = queueEvent;

    this.processEventWhenPreconditionFulfilled(queueEvent.id, Date.now());
  }

  // Recursively (re-)try to process the event
  private processEventWhenPreconditionFulfilled(
    targetEventId: string,
    startTime: number
  ) {
    const targetEvent = this.pendingEvent;

    // End retries if the target event of this retry cycle no longer exists
    if (!targetEvent || targetEvent.id !== targetEventId) {
      console.log(`Event not found - Exit due to OVERWRITE`);
      return;
    }

    // Stop on retry-timeout
    if (Date.now() - startTime >= targetEvent.retryTimeout) {
      console.log(
        `${targetEvent?.event.endpoint} (${targetEvent?.id}) - Exit due to TIMEOUT`
      );
      return;
    }

    // Stop retries if precondition is fulfilled & event can be processed
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

    // Retry if none of the above conditions were fulfilled
    setTimeout(() => {
      this.processEventWhenPreconditionFulfilled(targetEventId, startTime);
    }, 50);

    return;
  }
}

/* ---------------------------------- UTILS --------------------------------- */

const detemineIfPreconditionFulfilled = (
  endpoint: ClientActionEndpoint | 'startWorker' | 'terminateWorker',
  currentActiveWorkerState: () => ActiveWorkerState
): (() => boolean) => {
  switch (endpoint) {
    case 'selectText':
      return () => currentActiveWorkerState().stateName.startsWith('waiting');
    case 'deselectText':
      return () => currentActiveWorkerState().stateName.startsWith('waiting');
    case 'moveCaret':
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
  if (endpoint === 'moveCaret') {
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

    case 'moveCaret':
      return 3000;

    case 'updateTargetText':
      return 5000;

    case 'selectWordingAlternative':
      return 5000;

    default:
      return 3000;
  }
};
