import { Socket } from 'socket.io-client';
import { ActiveWorkerState, ClientActionEvent } from 'src/types/socket';
import { RephraseSlice, RephraseState } from 'src/types/store';
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

const socketEmit = (socket: Socket | null, event: ClientActionEvent) => {
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
    // if text is only whitespace
    if (text.trim().length === 0) {
      return;
    }

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

    set(() => ({
      waitingForServer: true,
    }));

    const event: ClientActionEvent = {
      endpoint: 'selectText',
      payload: {
        inputText: text,
      },
    };

    socketEmit(socket, event);
  },

  deselectText: async () => {
    const socket = get().socket;
    const workerState = get().activeWorkerState;
    if (
      workerState !== 'disconnected' &&
      workerState.stateName === 'waitingForSelectText'
    ) {
      return;
    }

    if (!socket) {
      set(() => ({
        waitingForServer: false,
        isErrorActive: true,
      }));
      return;
    }

    set(() => ({
      waitingForServer: true,
    }));

    const event: ClientActionEvent = {
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
