import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const deselectTextCompleted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'deselectTextCompleted',
    payload: event.puppetInfo[0].activeWorkerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default deselectTextCompleted;
