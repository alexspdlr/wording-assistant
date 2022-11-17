import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActiveWorkerState, ServerResponsePayload } from 'src/types/socket';
import generateDefaultWorkerState from 'src/utils/generateDefaultWorkerState';
import replaceCharactersBetween from 'src/utils/replaceCharactersBetween';

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

  const setIsErrorActive = useBoundStore((state) => state.setIsErrorActive);

  const setSocket = useBoundStore((state) => state.setSocket);

  const handleServerResponse = useBoundStore(
    (state) => state.handleServerResponse
  );

  const uiState = useBoundStore((state) => state.uiState);

  const socket = useSocket('ws://0.0.0.0:80', {
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

    socket.on('setupCompleted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'setupCompleted');
    });

    socket.on('selectTextStarted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'selectTextStarted');
    });

    socket.on('selectTextCompleted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'selectTextCompleted');
    });

    socket.on('moveCaretStarted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'moveCaretStarted');
    });

    socket.on('moveCaretCompleted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'moveCaretCompleted');
    });

    socket.on('updateTargetTextStarted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'updateTargetTextStarted');
    });

    socket.on('updateTargetTextCompleted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'updateTargetTextCompleted');
    });

    socket.on(
      'selectWordingAlternativeStarted',
      (payload: ServerResponsePayload) => {
        handleServerResponse(payload, 'selectWordingAlternativeStarted');
      }
    );

    socket.on(
      'selectWordingAlternativeCompleted',
      (payload: ServerResponsePayload) => {
        handleServerResponse(payload, 'selectWordingAlternativeCompleted');
      }
    );

    socket.on('deselectTextStarted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'deselectTextStarted');
    });

    socket.on('deselectTextCompleted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'deselectTextCompleted');
    });

    socket.on('processingErrorStarted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'processingErrorStarted');
    });

    socket.on('processingErrorCompleted', (payload: ServerResponsePayload) => {
      handleServerResponse(payload, 'processingErrorCompleted');
    });

    /** Connection / reconnection listeners */
    socket.on('connect', () => {
      setIsConnectedToServer(true);
      setIsErrorActive(false);
      handleServerResponse(
        {
          eventId: '',
          workerState: generateDefaultWorkerState('start'),
        },
        'connect'
      );
    });

    socket.on('disconnect', () => {
      handleServerResponse(
        {
          eventId: '',
          workerState: generateDefaultWorkerState('exit'),
        },
        'disconnect'
      );
    });

    // HANDLE RECONNECTION

    socket.io.on('reconnect', (attempt) => {
      handleServerResponse(
        {
          eventId: '',
          workerState: generateDefaultWorkerState('start'),
        },
        'reconnect'
      );

      console.info('Reconnected on attempt: ' + attempt);
      setIsConnectedToServer(true);
      setIsErrorActive(false);
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
