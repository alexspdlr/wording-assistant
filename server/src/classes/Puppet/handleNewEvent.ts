import { Socket } from 'socket.io';
import {
  ActiveWorkerState,
  SocketClientEvent,
  SocketClientEventEndpoint,
} from '../../types/socket';
import { v4 as uuidv4 } from 'uuid';

interface NextEvent {
  priority: 1 | 2 | 3;
  event: SocketClientEvent;
  waitingForPreconditionCanceled: boolean;
  retryTimeout: number;
  id: string;
}

let eventQueue: NextEvent[] = [];

const handleNewEvent = (
  event: SocketClientEvent,
  getActiveWorkerState: () => ActiveWorkerState | 'disconnected'
) => {
  const newEvent: NextEvent = {
    priority: determineEventPriority(event.endpoint),
    event,
    waitingForPreconditionCanceled: false,
    retryTimeout: determineRetryTimeout(event.endpoint),
    id: uuidv4(),
  };

  if (eventQueue.filter((e) => e.priority > newEvent.priority).length > 0) {
    console.log(
      `'${newEvent.event.endpoint}' not emitted, because an other pending event had a higher priority`
    );
    console.log(eventQueue);
    return;
  } else {
    // cancel any running execution cycle of current "next event"
    eventQueue.forEach(
      (event) => (event.waitingForPreconditionCanceled = true)
    );

    // replace next event
    eventQueue.push(newEvent);

    // execute
    const startTime = Date.now();
    execute(socket, startTime, getActiveWorkerState, newEvent.id);
  }
};

const execute = (
  socket: Socket,
  startTime: number,
  getActiveWorkerState: () => ActiveWorkerState | 'disconnected',
  eventId: string
) => {
  const targetEvent = eventQueue.find((e) => e.id === eventId);
  if (!targetEvent) return;

  console.log(`Execute '${targetEvent.event.endpoint}' - id: `, targetEvent.id);

  const passedTime = Date.now() - startTime;
  const activeWorkerState = getActiveWorkerState();

  if (
    activeWorkerState !== 'disconnected' &&
    preconditionFulfilled(targetEvent.event.endpoint, activeWorkerState)
  ) {
    // emit event
    const { endpoint, payload } = targetEvent.event;
    socket.emit(endpoint, payload);

    console.log('Exit reason: SUCCESSFUL EMIT');

    eventQueue = eventQueue.filter((event) => event.id !== targetEvent.id);

    return;
  }

  console.log('...');

  if (passedTime > targetEvent.retryTimeout) {
    console.log('Exit reason: TIMEOUT');
  }

  if (targetEvent.waitingForPreconditionCanceled) {
    console.log('Exit reason: OTHER EVENT');
  }

  if (
    targetEvent &&
    passedTime < targetEvent.retryTimeout &&
    !targetEvent.waitingForPreconditionCanceled
  ) {
    setTimeout(() => {
      execute(socket, startTime, getActiveWorkerState, eventId);
    }, 200);
  }
};

const preconditionFulfilled = (
  endpoint: SocketClientEventEndpoint,
  activeWorkerState: ActiveWorkerState
): boolean => {
  switch (endpoint) {
    case 'selectText':
      return activeWorkerState.stateName.startsWith('waiting');
    case 'deselectText':
      return activeWorkerState.stateName.startsWith('waiting');
    case 'moveCursor':
      return (
        activeWorkerState.stateName === 'waitingForMoveCursor' ||
        activeWorkerState.stateName === 'waitingForSelectWordingAlternative'
      );
    case 'updateTargetText':
      return (
        activeWorkerState.stateName === 'waitingForMoveCursor' ||
        activeWorkerState.stateName === 'waitingForSelectWordingAlternative'
      );

    case 'selectWordingAlternative':
      return (
        activeWorkerState.stateName === 'waitingForSelectWordingAlternative'
      );

    default:
      return false;
  }
};

const determineEventPriority = (
  endpoint: SocketClientEventEndpoint
): 1 | 2 | 3 => {
  if (endpoint === 'moveCursor') return 1;
  if (
    endpoint === 'updateTargetText' ||
    endpoint === 'selectWordingAlternative'
  )
    return 2;
  return 3;
};

const determineRetryTimeout = (endpoint: SocketClientEventEndpoint): number => {
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

export default handleNewEvent;
