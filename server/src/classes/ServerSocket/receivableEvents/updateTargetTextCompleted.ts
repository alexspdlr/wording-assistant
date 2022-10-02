import { ReceivableEvent } from '../../../types';
import { SocketServerEvent } from '../../../types/socket';

const updateTargetTextCompleted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const responseEvent: SocketServerEvent = {
    endpoint: 'updateTargetTextCompleted',
    payload: event.workerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default updateTargetTextCompleted;
