import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ActiveWorkerState } from 'src/types/socket';
import generateDefaultWorkerState from 'src/utils/generateDefaultWorkerState';

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

  const handleNewWorkerState = useBoundStore(
    (state) => state.handleNewWorkerState
  );

  const socket = useSocket('ws://localhost:3001', {
    reconnectionAttempts: 5,
    reconnectionDelay: 500,
    autoConnect: false,
  });

  useEffect(() => {
    socket.connect();
    startListeners();
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
      handleNewWorkerState(generateDefaultWorkerState('start'));
    });

    socket.on('disconnect', () => {
      handleNewWorkerState(generateDefaultWorkerState('exit'));
    });

    socket.on('setupCompleted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on('selectTextStarted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on('selectTextCompleted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on('moveCursorStarted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on('moveCursorCompleted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on('updateTargetTextStarted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on('updateTargetTextCompleted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on(
      'selectWordingAlternativeStarted',
      (payload: ActiveWorkerState) => {
        handleNewWorkerState(payload);
      }
    );

    socket.on(
      'selectWordingAlternativeCompleted',
      (payload: ActiveWorkerState) => {
        handleNewWorkerState(payload);
      }
    );

    socket.on('deselectTextStarted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on('deselectTextCompleted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
      handleNewWorkerState(payload);
    });

    socket.on('processingErrorStarted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    socket.on('processingErrorCompleted', (payload: ActiveWorkerState) => {
      handleNewWorkerState(payload);
    });

    // HANDLE RECONNECTION
    socket.io.on('reconnect', (attempt) => {
      handleNewWorkerState(generateDefaultWorkerState('start'));

      console.info('Reconnected on attempt: ' + attempt);
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

  return <>{children}</>;
};

export default SocketContextComponent;
