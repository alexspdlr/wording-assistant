import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const selectTextCompleted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'selectTextFinished',
    payload: event.puppetInfo[0].activeWorkerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default selectTextCompleted;
