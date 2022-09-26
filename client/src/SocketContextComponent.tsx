import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react';

import useBoundStore from './store';
import { useSocket } from './utils/hooks/useSocket';

export interface ISocketWrapperComponentProps extends PropsWithChildren {}

const SocketWrapperComponent: React.FunctionComponent<
  ISocketWrapperComponentProps
> = (props) => {
  const { children } = props;

  const setIsConnectedToServer = useBoundStore(
    (state) => state.setIsConnectedToServer
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

  const startListeners = () => {
    /** Messages */

    /** Connection / reconnection listeners */
    socket.on('connect', () => {
      //alert(`Socket is connected:  ${socket.connected}`);
      setIsConnectedToServer(true);
    });

    socket.on('disconnect', () => {
      //alert(`Socket is connected:  ${socket.connected}`);
    });

    socket.io.on('reconnect', (attempt) => {
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
    console.info('Sending handshake to server ...');

    socket.emit('handshake', async (uid: string, users: string[]) => {
      console.info('User handshake callback message received');
    });
  };

  return <>{children}</>;
};

export default SocketWrapperComponent;
