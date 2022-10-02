import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const updateTargetTextStarted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'updateTargetTextStarted',
    payload: event.workerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default updateTargetTextStarted;
