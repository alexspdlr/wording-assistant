import { ReceivableEvent } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingDeselectText,
  ActiveWorkerStateData_ProcessingMoveCursor,
  SocketServerEvent,
} from '../../../types/socket';

const moveCursorStarted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const data: ActiveWorkerStateData_ProcessingMoveCursor = {};

  const interceptedWorkerState: ActiveWorkerState = {
    stateName: 'processingMoveCursor',
    data,
  };

  const responseEvent: SocketServerEvent = {
    endpoint: 'moveCursorStarted',
    payload: interceptedWorkerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default moveCursorStarted;
