import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const selectWordingAlternativeCompleted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'selectWordingAlternativeCompleted',
    payload: event.workerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default selectWordingAlternativeCompleted;
