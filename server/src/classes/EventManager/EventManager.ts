import { randomUUID } from 'crypto';
import { DispatchableEvent, DispatchableEventCommand } from '../../types';
import { ActiveWorkerState } from '../../types/socket';

interface QueueEvent {
  event: DispatchableEvent;
  id: string;

  priority: 1 | 2 | 3 | 4;
  retryTimeout: number;
  preconditionFulfilled: () => boolean;
}

export class EventManager {
  public static instance: EventManager;
  public pendingEvent: QueueEvent | null;
  private processEvent: (event: DispatchableEvent) => void;
  private getActiveWorkerState: () => ActiveWorkerState;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

  constructor(
    processEvent: (event: DispatchableEvent) => void,
    getActiveWorkerState: () => ActiveWorkerState
  ) {
    this.pendingEvent = null;
    this.processEvent = processEvent;
    this.getActiveWorkerState = getActiveWorkerState;
  }

  /* ----------------------------- PUBLIC METHODS ----------------------------- */

  public handleNewEvent(event: DispatchableEvent) {
    const queueEvent: QueueEvent = {
      priority: determineEventPriority(event.command),
      event: event,
      retryTimeout: determineRetryTimeout(event.command),
      id: randomUUID(),
      preconditionFulfilled: detemineIfPreconditionFulfilled(
        event.command,
        this.getActiveWorkerState
      ),
    };

    // if event queue already contains event with higher priority
    if (this.pendingEvent && this.pendingEvent.priority > queueEvent.priority) {
      console.log(
        `'${queueEvent.event.command}' not queued, because an other pending event had a higher priority`
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
        `${targetEvent?.event.command} (${targetEvent?.id}) - Exit due to TIMEOUT`
      );
      return;
    }

    // stop (process) if precondition fulfilled
    if (targetEvent.preconditionFulfilled()) {
      console.log(
        `${targetEvent?.event.command} (${targetEvent?.id}) - Exit due to SUCCESS`
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
  eventCommand: DispatchableEventCommand,
  currentActiveWorkerState: () => ActiveWorkerState
): (() => boolean) => {
  switch (eventCommand) {
    case 'SELECT_TEXT':
      return () => currentActiveWorkerState().stateName.startsWith('waiting');
    case 'DESELECT_TEXT':
      return () => currentActiveWorkerState().stateName.startsWith('waiting');
    case 'MOVE_CURSOR':
      return () =>
        currentActiveWorkerState().stateName === 'waitingForMoveCursor' ||
        currentActiveWorkerState().stateName ===
          'waitingForSelectWordingAlternative';
    case 'UPDATE_TARGET_TEXT':
      return () =>
        currentActiveWorkerState().stateName === 'waitingForMoveCursor' ||
        currentActiveWorkerState().stateName ===
          'waitingForSelectWordingAlternative';

    case 'SELECT_WORDING_ALTERNATIVE':
      return () =>
        currentActiveWorkerState().stateName ===
        'waitingForSelectWordingAlternative';

    case 'START':
      return () => true;
    case 'EXIT':
      return () => true;

    default:
      return () => false;
  }
};

const determineEventPriority = (
  eventCommand: DispatchableEventCommand
): 1 | 2 | 3 | 4 => {
  if (eventCommand === 'MOVE_CURSOR') {
    return 1;
  }
  if (
    eventCommand === 'UPDATE_TARGET_TEXT' ||
    eventCommand === 'SELECT_WORDING_ALTERNATIVE'
  ) {
    return 2;
  }

  if (eventCommand === 'SELECT_TEXT' || eventCommand === 'DESELECT_TEXT') {
    return 3;
  }

  return 4;
};

const determineRetryTimeout = (
  eventCommand: DispatchableEventCommand
): number => {
  switch (eventCommand) {
    case 'SELECT_TEXT':
      return 8000;
    case 'DESELECT_TEXT':
      return 3000;

    case 'MOVE_CURSOR':
      return 3000;

    case 'UPDATE_TARGET_TEXT':
      return 5000;

    case 'SELECT_WORDING_ALTERNATIVE':
      return 5000;

    default:
      return 3000;
  }
};
