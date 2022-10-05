import { Socket } from 'socket.io-client';
import {
  ActiveWorkerState,
  ActiveWorkerStateData,
  ActiveWorkerStateName,
} from './socket';

export interface ClientWorkerState {
  stateName: ActiveWorkerStateName | 'disconnected';
  data: ActiveWorkerStateData;
}

type UiState = Omit<ActiveWorkerStateData, 'id' | 'cursorIndex'>;

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
  handleNewWorkerState: (newState: ClientWorkerState) => void;

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
