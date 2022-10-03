import { Socket } from 'socket.io-client';
import { ActiveWorkerState, SocketClientEvent } from './socket';

export interface RephraseState {
  originalText: string | null;
  rephrasedText: string | null;
  alternatives: string[] | null;

  // could be useful
  waitingForServer: boolean;
  isErrorActive: boolean;

  // server communication
  isConnectedToServer: boolean;
  socket: Socket | null;
  activeWorkerState: ActiveWorkerState | 'disconnected';
}

export interface RephraseActions {
  setSocket: (socket: Socket) => void;
  updateActiveWorkerState: (
    newState: ActiveWorkerState | 'disconnected'
  ) => void;
  setIsConnectedToServer: (isConnectedToServer: boolean) => void;
  updateRephrasingState: (
    originalText: string | undefined | null,
    rephrasedText: string | undefined | null,
    alternatives: string[] | undefined | null
  ) => void;
  setWaitingForServer: (waitingForServer: boolean) => void;

  // tool actions
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
