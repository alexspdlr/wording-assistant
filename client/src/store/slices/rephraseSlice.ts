import produce from 'immer';
import { Socket } from 'socket.io-client';
import {
  ActiveWorkerTextSelection,
  ClientActionEvent,
  ClientActionPayload_DeselectText,
  ClientActionPayload_moveCaret,
  ClientActionPayload_SelectText,
  ClientActionPayload_SelectWordingAlternative,
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
      caretIndex: 0,
      originalTextSelection: null,
      activeTextSelection: null,
      rephrasingOptions: [],
    },
  },
  uiState: {
    originalTextSelection: null,
    activeTextSelection: null,
    activeRephrasingToken: null,
    rephrasingOptions: [],
    expectedResponse: null,
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

  setActiveRephrasingToken: (newToken: TextToken | null) => {
    if (!_.isEqual(get().uiState.activeRephrasingToken, newToken)) {
      set(
        produce((state: RephraseState) => {
          state.uiState.activeRephrasingToken = newToken;
        })
      );
    }
  },

  setOriginalTextSelection: (selection: ActiveWorkerTextSelection | null) => {
    set(
      produce((state: RephraseState) => {
        state.uiState.originalTextSelection = selection;
      })
    );
  },

  setActiveTextSelection: (selection: ActiveWorkerTextSelection | null) => {
    set(
      produce((state: RephraseState) => {
        state.uiState.activeTextSelection = selection;
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

    // console.log(`${endpoint} - ${JSON.stringify(newState)}`);

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
        console.log('*********');
        console.log('serverResponsePayload:', payload);
        console.log('expectedResponse:', expectedResponse);
        console.log('*********');
        set(
          produce((state: RephraseState) => {
            state.uiState.expectedResponse = null;
          })
        );
      } else {
        // block ui update

        // console.log(`Blocked ${endpoint}`);
        return;
      }
    }

    /* ------------------------ UPDATE DIFFERENCES IN UI ------------------------ */

    console.log(`${endpoint}: `, payload);

    const currentUiState = get().uiState;

    if (
      !_.isEqual(
        newState.data.originalTextSelection,
        currentUiState.originalTextSelection
      )
    ) {
      set(
        produce((state: RephraseState) => {
          state.uiState.originalTextSelection =
            newState.data.originalTextSelection;
        })
      );
    }

    if (
      !_.isEqual(
        newState.data.activeTextSelection,
        currentUiState.activeTextSelection
      )
    ) {
      set(
        produce((state: RephraseState) => {
          state.uiState.activeTextSelection = newState.data.activeTextSelection;
        })
      );
    }

    if (
      !_.isEqual(
        newState.data.rephrasingOptions,
        currentUiState.rephrasingOptions
      )
    ) {
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

  selectText: async (newTextSelection: ActiveWorkerTextSelection) => {
    // PREPARE
    const socket = get().socket;
    const eventId = prepareClientAction(socket, set);
    if (!eventId) {
      return;
    }

    // HANDLE CUSTOM DECLINE SITUATIONS
    if (newTextSelection.value.trim().length === 0) {
      return;
    }

    // UPDATE UI STATE

    set(
      produce((state: RephraseState) => {
        state.uiState.originalTextSelection = newTextSelection;
        state.uiState.activeTextSelection = newTextSelection;
        state.uiState.rephrasingOptions = [];
        state.uiState.expectedResponse = {
          eventId,
          endpoint: 'selectText',
        };
      })
    );

    // EMIT TO SOCKET

    const payload: ClientActionPayload_SelectText = {
      eventId,
      newTextSelection,
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

    // block deselect if nothing is selected
    if (
      get().uiState.originalTextSelection === null &&
      get().uiState.activeTextSelection === null
    ) {
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
        state.uiState.originalTextSelection = null;
        state.uiState.activeTextSelection = null;
        state.uiState.rephrasingOptions = [];
        state.uiState.activeRephrasingToken = null;
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

  /* ------------------------------- MOVE CARET ------------------------------ */
  moveCaret: async (
    newCaretIndex: number,
    newActiveRephrasingToken: TextToken | null
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
        state.uiState.activeRephrasingToken = newActiveRephrasingToken;
        state.uiState.expectedResponse = {
          eventId,
          endpoint: 'moveCaret',
        };
      })
    );

    const payload: ClientActionPayload_moveCaret = {
      eventId,
      newCaretIndex,
    };

    const event: ClientActionEvent = {
      endpoint: 'moveCaret',
      payload,
    };

    socketEmit(socket, event);
  },

  /* --------------------------- UPDATE TARGET TEXT --------------------------- */
  updateTargetText: async (
    newActiveTextSelection: ActiveWorkerTextSelection
  ) => {
    // PREPARE
    const socket = get().socket;
    const eventId = prepareClientAction(socket, set);
    if (!eventId) {
      return;
    }

    // UPDATE UI STATE

    set(
      produce((state: RephraseState) => {
        state.uiState.activeTextSelection = newActiveTextSelection;
        state.uiState.rephrasingOptions = [];
        state.uiState.expectedResponse = {
          eventId,
          endpoint: 'updateTargetText',
        };
      })
    );

    const payload: ClientActionPayload_UpdateTargetText = {
      eventId,
      newActiveTextSelection,
    };

    const event: ClientActionEvent = {
      endpoint: 'updateTargetText',
      payload,
    };

    socketEmit(socket, event);
  },

  /* ----------------------- SELECT WORDING ALTERNATIVE ----------------------- */

  selectWordingAlternative: (
    selectedAlternativeIndex: number,
    selectedAlternativeValue: string
  ) => {
    // PREPARE
    const socket = get().socket;
    const eventId = prepareClientAction(socket, set);
    if (!eventId) {
      return;
    }

    // UPDATE UI STATE
    set(
      produce((state: RephraseState) => {
        state.uiState.rephrasingOptions = [];
        state.uiState.activeRephrasingToken = null;
        state.uiState.expectedResponse = {
          eventId,
          endpoint: 'selectWordingAlternative',
        };
      })
    );

    const payload: ClientActionPayload_SelectWordingAlternative = {
      eventId,
      selectedAlternativeIndex,
      selectedAlternativeValue,
    };

    const event: ClientActionEvent = {
      endpoint: 'selectWordingAlternative',
      payload,
    };

    socketEmit(socket, event);
  },
});

export default createRephraseSlice;
