import { Socket } from 'socket.io-client';
import { EmittableSocketEvent } from 'src/types/socket';
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
  socketEmit: (event: EmittableSocketEvent) => {
    const { eventName, payload } = event;

    const socket = get().socket;
    if (socket) {
      socket.emit(eventName, payload, async (callback: any) => {
        console.info(`Callback for ${eventName}: `, callback);
      });
    }
  },
});
