import { Socket } from 'socket.io-client';
import {
  ActiveWorkerState,
  ActiveWorkerStateData,
  ActiveWorkerStateName,
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
interface UiState extends Omit<ActiveWorkerStateData, 'id' | 'cursorIndex'> {
  expectedResponse: UiExpectedResponse | null;
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

  // handle incoming server event
  handleServerResponse: (
    payload: ServerResponsePayload,
    endpoint: ServerResponseEndpoint | 'connect' | 'reconnect' | 'disconnect'
  ) => void;

  // client actions
  selectText: (text: string) => void;
  deselectText: () => void;
  moveCursor: (newCursorIndex: number) => void;
  updateTargetText: (newTargetText: string, newCursorIndex: number) => void;
  selectWordingAlternative: (selectedAlternativeIndex: number) => void;
}

export interface RephraseSlice extends RephraseState, RephraseActions {}

export interface AppState {
  colorMode: 'light' | 'dark';
}

export interface AppActions {
  setLightMode: () => void;
  setDarkMode: () => void;
}
