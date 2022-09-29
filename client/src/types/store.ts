import { Socket } from 'socket.io-client';
import { ActiveWorkerState, SocketClientEvent } from './socket';

export interface RephraseState {
  originalText: string | null;
  rephrasedText: string | null;
  selectedWordIndex: number | null;
  alternatives: string[] | null;
  waitingForServer: boolean;
  isErrorActive: boolean;
}

export interface RephraseActions {
  generateRephrasingBase: (selectedText: string) => void;
  reset: () => void;
}

export interface RephraseSlice extends RephraseState, RephraseActions {}

export interface AppState {
  colorMode: 'light' | 'dark';
  socket: Socket | null;
  isConnectedToServer: boolean;
  activeWorkerState: ActiveWorkerState;
}

export interface AppActions {
  setLightMode: () => void;
  setDarkMode: () => void;
  setIsConnectedToServer: (isConnectedToServer: boolean) => void;
  setSocket: (socket: Socket) => void;
  socketEmit: (event: SocketClientEvent) => void;
  updateActiveWorkerState: (newState: ActiveWorkerState) => void;
}
