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
  isConnectedToServer: boolean;
}

export interface AppActions {
  setLightMode: () => void;
  setDarkMode: () => void;
  setIsConnectedToServer: (isConnectedToServer: boolean) => void;
}
