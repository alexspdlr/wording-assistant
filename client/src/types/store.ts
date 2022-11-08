import { Socket } from 'socket.io-client';
import {
  ActiveWorkerState,
  ActiveWorkerStateData,
  ActiveWorkerStateName,
  ActiveWorkerTextSelection,
  ClientActionEndpoint,
  ServerResponseEndpoint,
  ServerResponsePayload,
} from './socket';

export interface ClientWorkerState {
  stateName: ActiveWorkerStateName | 'disconnected';
  data: ActiveWorkerStateData;
}

export interface UiExpectedResponse {
  eventId: string;
  endpoint: ClientActionEndpoint;
}

export interface TextToken {
  value: string;
  kind: 'whitespace' | 'special_character' | 'text';
  startIndex: number;
  endIndex: number;
}

export type TextTokenReduced = Omit<TextToken, 'startIndex' | 'endIndex'>;

interface UiState extends Omit<ActiveWorkerStateData, 'id' | 'cursorIndex'> {
  expectedResponse: UiExpectedResponse | null;
  activeRephrasingToken: TextToken | null;
}

export interface RephraseState {
  // worker state in server
  serverState: ClientWorkerState;

  // rendered state (UI)
  uiState: UiState;

  // server communication
  isConnectedToServer: boolean;
  isErrorActive: boolean;
  socket: Socket | null;
}

export interface RephraseActions {
  // setter
  setSocket: (socket: Socket) => void;
  setIsConnectedToServer: (isConnectedToServer: boolean) => void;
  setIsErrorActive: (isErrorActive: boolean) => void;
  setActiveRephrasingToken: (newToken: TextToken | null) => void;
  setOriginalTextSelection: (
    selection: ActiveWorkerTextSelection | null
  ) => void;
  setActiveTextSelection: (selection: ActiveWorkerTextSelection | null) => void;

  // handle incoming server event
  handleServerResponse: (
    payload: ServerResponsePayload,
    endpoint: ServerResponseEndpoint | 'connect' | 'reconnect' | 'disconnect'
  ) => void;

  // client actions
  selectText: (newOriginalTextSelection: ActiveWorkerTextSelection) => void;
  deselectText: () => void;
  moveCursor: (
    newCursorIndex: number,
    selectedTextToken: TextToken | null
  ) => void;
  updateTargetText: (newActiveTextSelection: ActiveWorkerTextSelection) => void;
  selectWordingAlternative: (
    selectedAlternativeIndex: number,
    selectedAlternativeValue: string
  ) => void;
}

export interface RephraseSlice extends RephraseState, RephraseActions {}

export interface AppState {
  colorMode: 'light' | 'dark';
}

export interface AppActions {
  setLightMode: () => void;
  setDarkMode: () => void;
}
