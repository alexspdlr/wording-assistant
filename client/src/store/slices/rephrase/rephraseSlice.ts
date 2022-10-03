import { Socket } from 'socket.io-client';
import {
  ActiveWorkerState,
  SocketClientEvent,
  SocketClientEventEndpoint,
} from 'src/types/socket';
import { RephraseSlice, RephraseState } from 'src/types/store';
import serverRequest from 'src/utils/serverRequest';
import { StateCreator } from 'zustand';

const ininitalState: RephraseState = {
  originalText: null,
  rephrasedText: null,
  alternatives: null,
  waitingForServer: false,
  isErrorActive: false,
  isConnectedToServer: true,
  socket: null,
  activeWorkerState: 'disconnected',
};

const socketEmit = (socket: Socket | null, event: SocketClientEvent) => {
  const { endpoint, payload } = event;
  if (socket) {
    socket.emit(endpoint, payload, async (callback: any) => {
      console.info(`Callback for ${endpoint}: `, callback);
    });
  }
};

const createRephraseSlice: StateCreator<
  RephraseSlice,
  [],
  [],
  RephraseSlice
> = (set, get) => ({
  ...ininitalState,

  /*
  
  selectText: async (selectedText: string) => {
    set(() => ({
      waitingForServer: true,
    }));
    const response = await serverRequest({
      endpoint: '/setup-rephrasing',
      method: 'POST',
      inputBody: { input: selectedText },
    });

    if (!response) {
      set(() => ({
        waitingForServer: false,
        isErrorActive: true,
      }));
    } else {
      set(() => ({
        waitingForServer: false,
        originalText: selectedText,
        rephrasedText: `processID: ${response.processID}, result: ${response.rephrasingResult}`,
        isErrorActive: false,
      }));
    }
  },
  */

  setSocket: (socket: Socket) => {
    set(() => ({
      socket,
    }));
  },

  updateActiveWorkerState: (newState: ActiveWorkerState | 'disconnected') => {
    set(() => ({
      activeWorkerState: newState,
    }));
  },

  setIsConnectedToServer: (isConnectedToServer: boolean) => {
    set(() => ({
      isConnectedToServer,
    }));
  },

  // tool actions
  selectText: async (text: string) => {
    const socket = get().socket;

    if (!socket) {
      set(() => ({
        waitingForServer: false,
        isErrorActive: true,
      }));
      return;
    }

    set(() => ({
      originalText: text,
    }));

    // TODO: check precondition (write reusableFunction), if !fulfilled -> retry for n seconds, then setError = true

    set(() => ({
      waitingForServer: true,
    }));

    const event: SocketClientEvent = {
      endpoint: 'selectText',
      payload: {
        inputText: text,
      },
    };

    socketEmit(socket, event);
  },

  deselectText: async () => {
    const socket = get().socket;

    if (!socket) {
      set(() => ({
        waitingForServer: false,
        isErrorActive: true,
      }));
      return;
    }

    // TODO: check precondition (write reusableFunction), if !fulfilled -> retry for n seconds, then setError = true

    set(() => ({
      waitingForServer: true,
    }));

    const event: SocketClientEvent = {
      endpoint: 'deselectText',
      payload: {},
    };

    socketEmit(socket, event);
  },
  moveCursor: (newCursorIndex: number) => null,
  updateTargetText: (newTargetText: string, newCursorIndex: number) => null,
  selectWordingAlternative: (selectedAlternativeIndex: number) => null,

  updateRephrasingState: (
    originalText: string | undefined | null,
    rephrasedText: string | undefined | null,
    alternatives: string[] | undefined | null
  ) => {
    if (originalText !== undefined)
      set(() => ({
        originalText,
      }));
    if (rephrasedText !== undefined)
      set(() => ({
        rephrasedText,
      }));
    if (alternatives !== undefined)
      set(() => ({
        alternatives,
      }));
  },
  setWaitingForServer: (waitingForServer: boolean) => {
    set(() => ({
      waitingForServer,
    }));
  },
});

export default createRephraseSlice;
