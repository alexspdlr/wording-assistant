import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ActiveWorkerState } from 'src/types/socket';

import useBoundStore from '../store';
import { useSocket } from '../utils/hooks/useSocket';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;

  const setIsConnectedToServer = useBoundStore(
    (state) => state.setIsConnectedToServer
  );

  const setSocket = useBoundStore((state) => state.setSocket);
  const updateActiveWorkerState = useBoundStore(
    (state) => state.updateActiveWorkerState
  );

  const socket = useSocket('ws://localhost:3001', {
    reconnectionAttempts: 5,
    reconnectionDelay: 500,
    autoConnect: false,
  });

  useEffect(() => {
    socket.connect();
    startListeners();
    sendHandshake();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSocket(socket);

    // eslint-disable-next-line
  }, [socket]);

  const startListeners = () => {
    /** Messages */

    /** Connection / reconnection listeners */
    socket.on('connect', () => {
      setIsConnectedToServer(true);
      updateActiveWorkerState({
        stateName: 'processingInitialize',
        data: {},
      });
    });

    socket.on('disconnect', () => {
      updateActiveWorkerState({
        stateName: 'processingInitialize',
        data: {},
      });
    });

    socket.on('setupFinished', (payload: ActiveWorkerState) => {
      updateActiveWorkerState(payload);
    });

    socket.on('selectTextFinished', (payload: ActiveWorkerState) => {
      updateActiveWorkerState(payload);
    });

    // HANDLE RECONNECTION
    socket.io.on('reconnect', (attempt) => {
      updateActiveWorkerState({
        stateName: 'processingInitialize',
        data: {},
      });
      console.info('Reconnected on attempt: ' + attempt);
      sendHandshake();
      setIsConnectedToServer(true);
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.info('Reconnection Attempt: ' + attempt);
    });

    socket.io.on('reconnect_error', (error) => {
      console.info('Reconnection error: ' + error);
    });

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.');
      setIsConnectedToServer(false);
    });
  };

  const sendHandshake = async () => {
    socket.emit('handshake', async (uid: string, users: string[]) => {
      console.info('User handshake callback message received');
    });
  };

  return <>{children}</>;
};

export default SocketContextComponent;
