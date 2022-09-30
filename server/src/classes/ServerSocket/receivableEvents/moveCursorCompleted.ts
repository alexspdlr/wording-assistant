import { ReceivableEvent } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingDeselectText,
  ActiveWorkerStateData_ProcessingMoveCursor,
  ActiveWorkerStateData_WaitingForMoveCursor,
  SocketServerEvent,
} from '../../../types/socket';

const moveCursorCompleted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'moveCursorCompleted',
    payload: event.workerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default moveCursorCompleted;
