import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const selectWordingAlternativeStarted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'selectWordingAlternativeStarted',
    payload: event.workerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default selectWordingAlternativeStarted;
