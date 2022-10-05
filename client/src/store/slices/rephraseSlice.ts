import { Socket } from 'socket.io-client';
import { ActiveWorkerState, ClientActionEvent } from 'src/types/socket';
import {
  ClientWorkerState,
  RephraseSlice,
  RephraseState,
} from 'src/types/store';
import { StateCreator } from 'zustand';
import produce from 'immer';

const ininitalState: RephraseState = {
  serverState: {
    stateName: 'disconnected',
    data: {
      id: '',
      originalText: null,
      targetText: null,
      cursorIndex: 0,
      rephrasingOptions: [],
    },
  },

  uiState: {
    originalText: null,
    targetText: null,
    rephrasingOptions: [],
  },

  isErrorActive: false,
  isConnectedToServer: false,
  socket: null,
};

/* ----------------------------- UTIL FUNCTIONS ----------------------------- */
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

  /* -------------------------------------------------------------------------- */
  /*                                   SETTER                                   */
  /* -------------------------------------------------------------------------- */

  setSocket: (socket: Socket) => {
    set(
      produce((state: RephraseState) => {
        state.socket = socket;
      })
    );
  },

  setIsConnectedToServer: (isConnectedToServer: boolean) => {
    set(
      produce((state: RephraseState) => {
        state.isConnectedToServer = isConnectedToServer;
      })
    );
  },

  setIsErrorActive: (isErrorActive: boolean) => {
    set(
      produce((state: RephraseState) => {
        state.isErrorActive = isErrorActive;
      })
    );
  },

  /* -------------------------------------------------------------------------- */
  /*                        HANDLE INCOMING SERVER EVENT                        */
  /* -------------------------------------------------------------------------- */

  handleNewWorkerState: (newState: ClientWorkerState) => {
    // update differences in ui state
    const currentUiState = get().uiState;
    if (newState.data.originalText !== currentUiState.originalText) {
      set(
        produce((state: RephraseState) => {
          state.uiState.originalText = newState.data.originalText;
        })
      );
    }

    if (newState.data.targetText !== currentUiState.targetText) {
      set(
        produce((state: RephraseState) => {
          state.uiState.targetText = newState.data.targetText;
        })
      );
    }

    if (newState.data.rephrasingOptions !== currentUiState.rephrasingOptions) {
      set(
        produce((state: RephraseState) => {
          state.uiState.rephrasingOptions = newState.data.rephrasingOptions;
        })
      );
    }

    // update server state
    set(
      produce((state: RephraseState) => {
        state.serverState = newState;
      })
    );
  },

  /* -------------------------------------------------------------------------- */
  /*                               CLIENT ACTIONS                               */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- SELECT TEXT ------------------------------ */

  selectText: async (text: string) => {
    // HANDLE DECLINE SITUATIONS
    if (text.trim().length === 0) {
      return;
    }

    const socket = get().socket;
    if (!socket) {
      set(
        produce((state: RephraseState) => {
          state.isErrorActive = true;
        })
      );
      return;
    }

    // EMIT TO SOCKET
    const event: ClientActionEvent = {
      endpoint: 'selectText',
      payload: {
        originalText: text,
      },
    };

    socketEmit(socket, event);
  },

  /* ------------------------------ DESELECT TEXT ----------------------------- */
  deselectText: async () => {
    // HANDLE DECLINE SITUATIONS
    const workerState = get().serverState;
    if (workerState.stateName === 'waitingForSelectText') {
      return;
    }

    const socket = get().socket;
    if (!socket) {
      set(
        produce((state: RephraseState) => {
          state.isErrorActive = true;
        })
      );
      return;
    }

    // UPDATE UI STATE
    set(
      produce((state: RephraseState) => {
        state.uiState.originalText = null;
        state.uiState.targetText = null;
        state.uiState.rephrasingOptions = [];
      })
    );

    const event: ClientActionEvent = {
      endpoint: 'deselectText',
      payload: {},
    };

    socketEmit(socket, event);
  },

  moveCursor: (newCursorIndex: number) => null,
  updateTargetText: (newTargetText: string, newCursorIndex: number) => null,
  selectWordingAlternative: (selectedAlternativeIndex: number) => null,
});

export default createRephraseSlice;
