import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const startCompleted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'setupCompleted',
    payload: event.workerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default startCompleted;
