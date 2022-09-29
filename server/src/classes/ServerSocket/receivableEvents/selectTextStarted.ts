import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const selectTextStarted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'selectTextStarted',
    payload: event.workerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default selectTextStarted;
