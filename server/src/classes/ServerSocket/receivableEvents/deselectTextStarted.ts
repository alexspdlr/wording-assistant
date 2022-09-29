import { ReceivableEvent } from '../../../types';
import {
  ActiveWorkerState,
  ActiveWorkerStateData_ProcessingDeselectText,
  SocketServerEvent,
} from '../../../types/socket';

const deselectTextStarted = (
  event: ReceivableEvent,
  socketId: string,
  emitToSocket: (socketId: string, event: SocketServerEvent) => void
) => {
  const data: ActiveWorkerStateData_ProcessingDeselectText = {};

  const interceptedWorkerState: ActiveWorkerState = {
    stateName: 'processingDeselectText',
    data,
  };

  const responseEvent: SocketServerEvent = {
    endpoint: 'deselectTextStarted',
    payload: interceptedWorkerState,
  };

  emitToSocket(socketId, responseEvent);
};

export default deselectTextStarted;
