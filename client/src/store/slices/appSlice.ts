import { Socket } from 'socket.io-client';
import { ActiveWorkerState, SocketClientEvent } from 'src/types/socket';
import { AppState, AppActions } from 'src/types/store';
import { StateCreator } from 'zustand';

const locallyStoredColorMode = () => {
  const storedValue = localStorage.getItem('color-mode');
  const storedValueParsed =
    typeof storedValue === 'string' ? JSON.parse(storedValue) : undefined;

  if (storedValueParsed) {
    return storedValueParsed;
  }
};

const ininitalState: AppState = {
  colorMode:
    locallyStoredColorMode() ||
    (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light') ||
    'light',
  isConnectedToServer: true,
  socket: null,
  activeWorkerState: {
    stateName: 'processingInitialize',
    data: {},
  },
};

export interface AppSlice extends AppState, AppActions {}

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (
  set,
  get
) => ({
  ...ininitalState,
  setLightMode: () => {
    localStorage.setItem('color-mode', JSON.stringify('light'));
    set(() => ({
      colorMode: 'light',
    }));
  },
  setDarkMode: () => {
    localStorage.setItem('color-mode', JSON.stringify('dark'));
    set(() => ({
      colorMode: 'dark',
    }));
  },
  setIsConnectedToServer: (isConnectedToServer: boolean) => {
    set(() => ({
      isConnectedToServer,
    }));
  },
  setSocket: (socket: Socket) => {
    set(() => ({
      socket,
    }));
  },
  socketEmit: (event: SocketClientEvent) => {
    const { endpoint, payload } = event;

    const socket = get().socket;
    if (socket) {
      socket.emit(endpoint, payload, async (callback: any) => {
        console.info(`Callback for ${endpoint}: `, callback);
      });
    }
  },
  updateActiveWorkerState: (newState: ActiveWorkerState) => {
    set(() => ({
      activeWorkerState: newState,
    }));
  },
});
