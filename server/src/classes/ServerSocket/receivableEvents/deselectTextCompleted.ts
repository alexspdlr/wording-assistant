import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const deselectTextCompleted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'deselectTextCompleted',
    payload: event.workerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default deselectTextCompleted;
