import produce from 'immer';
import { Socket } from 'socket.io-client';
import {
  ClientActionEvent,
  ClientActionPayload_SelectText,
  ServerResponseEndpoint,
  ServerResponsePayload,
} from 'src/types/socket';
import { RephraseSlice, RephraseState } from 'src/types/store';
import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

const ininitalState: RephraseState = {
  serverState: {
    stateName: 'disconnected',
    data: {
      id: '',
      originalText: null,
      targetText: null,
      cursorIndex: 0,
      rephrasingOptions: [],
      sourceSelectionStart: null,
      sourceSelectionEnd: null,
    },
  },
  uiState: {
    originalText: null,
    targetText: null,
    rephrasingOptions: [],
    expectedResponse: null,
    sourceSelectionStart: null,
    sourceSelectionEnd: null,
  },
  isErrorActive: false,
  isConnectedToServer: false,
  socket: null,
};

/* ----------------------------- UTIL FUNCTIONS ----------------------------- */
const socketEmit = (socket: Socket | null, event: ClientActionEvent) => {
  const { endpoint, payload } = event;
  if (socket) {
    console.log(`${endpoint}:`, payload);
    socket.emit(endpoint, payload, async (callback: any) => {});
  }
};

const prepareClientAction = (
  socket: Socket | null,
  set: Function
): string | false => {
  if (!socket) {
    set(
      produce((state: RephraseState) => {
        state.isErrorActive = true;
      })
    );
    return false;
  }
  return uuidv4();
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

  handleServerResponse: (
    payload: ServerResponsePayload,
    endpoint: ServerResponseEndpoint | 'connect' | 'reconnect' | 'disconnect'
  ) => {
    const newState = payload.workerState;
    const eventId = payload.eventId;

    /* --------------------------- HANDLE EXPECT EVENT -------------------------- */

    const expectedResponse = get().uiState.expectedResponse;

    if (expectedResponse) {
      const resolvingEndpoints: Array<
        ServerResponseEndpoint | 'connect' | 'reconnect' | 'disconnect'
      > = [
        'connect',
        'disconnect',
        'reconnect',
        'processingErrorCompleted',
        'setupCompleted',
      ];

      if (
        (endpoint.endsWith('Completed') &&
          eventId === expectedResponse.eventId) ||
        resolvingEndpoints.includes(endpoint)
      ) {
        // resolve expectation
        set(
          produce((state: RephraseState) => {
            state.uiState.expectedResponse = null;
          })
        );
      } else {
        // block ui update
        return;
      }
    }

    /* ------------------------ UPDATE DIFFERENCES IN UI ------------------------ */
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

    if (
      newState.data.sourceSelectionStart !== currentUiState.sourceSelectionStart
    ) {
      set(
        produce((state: RephraseState) => {
          state.uiState.sourceSelectionStart =
            newState.data.sourceSelectionStart;
        })
      );
    }

    if (
      newState.data.sourceSelectionEnd !== currentUiState.sourceSelectionEnd
    ) {
      set(
        produce((state: RephraseState) => {
          state.uiState.sourceSelectionEnd = newState.data.sourceSelectionEnd;
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

  selectText: async (
    text: string,
    selectionStart: number,
    selectionEnd: number
  ) => {
    // PREPARE
    const socket = get().socket;
    const eventId = prepareClientAction(socket, set);
    if (!eventId) {
      return;
    }

    // HANDLE CUSTOM DECLINE SITUATIONS
    if (text.trim().length === 0) {
      return;
    }

    // UPDATE UI STATE
    set(
      produce((state: RephraseState) => {
        state.uiState.originalText = text;
        state.uiState.sourceSelectionStart = selectionStart;
        state.uiState.sourceSelectionEnd = selectionEnd;
        state.uiState.expectedResponse = {
          eventId,
          endpoint: 'selectText',
        };
      })
    );

    // EMIT TO SOCKET

    const eventPayload: ClientActionPayload_SelectText = {
      eventId,
      originalText: text,
      sourceSelectionStart: selectionStart,
      sourceSelectionEnd: selectionEnd,
    };

    const event: ClientActionEvent = {
      endpoint: 'selectText',
      payload: eventPayload,
    };

    socketEmit(socket, event);
  },

  /* ------------------------------ DESELECT TEXT ----------------------------- */
  deselectText: async () => {
    // PREPARE
    const socket = get().socket;
    const eventId = prepareClientAction(socket, set);
    if (!eventId) {
      return;
    }

    // block deselect if deselectCompleted is already expected
    if (
      get().uiState.expectedResponse !== null &&
      get().uiState.expectedResponse?.endpoint === 'deselectText'
    ) {
      return;
    }

    // UPDATE UI STATE
    set(
      produce((state: RephraseState) => {
        state.uiState.originalText = null;
        state.uiState.targetText = null;
        state.uiState.sourceSelectionStart = null;
        state.uiState.sourceSelectionEnd = null;
        state.uiState.rephrasingOptions = [];
        state.uiState.expectedResponse = {
          eventId,
          endpoint: 'deselectText',
        };
      })
    );

    const event: ClientActionEvent = {
      endpoint: 'deselectText',
      payload: {
        eventId,
      },
    };

    socketEmit(socket, event);
  },

  moveCursor: (newCursorIndex: number) => null,
  updateTargetText: (newTargetText: string, newCursorIndex: number) => null,
  selectWordingAlternative: (selectedAlternativeIndex: number) => null,
});

export default createRephraseSlice;
