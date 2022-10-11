import produce from 'immer';
import { Socket } from 'socket.io-client';
import {
  ClientActionEvent,
  ClientActionPayload_DeselectText,
  ClientActionPayload_MoveCursor,
  ClientActionPayload_SelectText,
  ClientActionPayload_UpdateTargetText,
  ServerResponseEndpoint,
  ServerResponsePayload,
} from 'src/types/socket';
import { RephraseSlice, RephraseState, TextToken } from 'src/types/store';
import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';
import _ from 'lodash';

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
    selectedTextToken: null,
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
    console.log(`EMIT - ${endpoint}:`, payload);
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

  setSelectedTextToken: (newToken: TextToken | null) => {
    if (!_.isEqual(get().uiState.selectedTextToken, newToken)) {
      set(
        produce((state: RephraseState) => {
          state.uiState.selectedTextToken = newToken;
        })
      );
    }
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

    console.log(
      `Enpoint: ${endpoint}, expectedResponse: ${JSON.stringify(
        expectedResponse
      )}`
    );

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

        console.log(`Blocked ${endpoint}`);
        return;
      }
    }

    /* ------------------------ UPDATE DIFFERENCES IN UI ------------------------ */

    console.log(`${endpoint}: `, payload);

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

    const payload: ClientActionPayload_SelectText = {
      eventId,
      originalText: text,
      sourceSelectionStart: selectionStart,
      sourceSelectionEnd: selectionEnd,
    };

    const event: ClientActionEvent = {
      endpoint: 'selectText',
      payload,
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

    const payload: ClientActionPayload_DeselectText = {
      eventId,
    };

    const event: ClientActionEvent = {
      endpoint: 'deselectText',
      payload,
    };

    socketEmit(socket, event);
  },

  /* ------------------------------- MOVE CURSOR ------------------------------ */
  moveCursor: async (
    newCursorIndex: number,
    selectedTextToken: TextToken | null
  ) => {
    // PREPARE
    const socket = get().socket;
    const eventId = prepareClientAction(socket, set);
    if (!eventId) {
      return;
    }
    if (get().uiState.expectedResponse?.endpoint === 'updateTargetText') {
      return;
    }

    // UPDATE UI STATE
    set(
      produce((state: RephraseState) => {
        state.uiState.rephrasingOptions = [];
        state.uiState.selectedTextToken = selectedTextToken;
        state.uiState.expectedResponse = {
          eventId,
          endpoint: 'moveCursor',
        };
      })
    );

    const payload: ClientActionPayload_MoveCursor = {
      eventId,
      newCursorIndex,
    };

    const event: ClientActionEvent = {
      endpoint: 'moveCursor',
      payload,
    };

    socketEmit(socket, event);
  },

  /* --------------------------- UPDATE TARGET TEXT --------------------------- */
  updateTargetText: async (newTargetText: string) => {
    // PREPARE
    const socket = get().socket;
    const eventId = prepareClientAction(socket, set);
    if (!eventId) {
      return;
    }

    // UPDATE UI STATE
    set(
      produce((state: RephraseState) => {
        state.uiState.targetText = newTargetText;
        state.uiState.expectedResponse = {
          eventId,
          endpoint: 'updateTargetText',
        };
      })
    );

    const payload: ClientActionPayload_UpdateTargetText = {
      eventId,
      newTargetText,
    };

    const event: ClientActionEvent = {
      endpoint: 'updateTargetText',
      payload,
    };

    socketEmit(socket, event);
  },
  selectWordingAlternative: (selectedAlternativeIndex: number) => null,
});

export default createRephraseSlice;
