import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const deselectTextStarted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'deselectTextStarted',
    payload: event.puppetInfo[0].activeWorkerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default deselectTextStarted;
