import { RephraseSlice, RephraseState } from 'src/types/store';
import serverRequest from 'src/utils/serverRequest';
import { StateCreator } from 'zustand';

const ininitalState: RephraseState = {
  originalText: null,
  rephrasedText: null,
  selectedWordIndex: null,
  alternatives: null,
  waitingForServer: false,
  isErrorActive: false,
};

const resetState: Omit<RephraseState, 'waitingForServer' | 'isErrorActive'> = {
  originalText: null,
  rephrasedText: null,
  selectedWordIndex: null,
  alternatives: null,
};

export const createRephraseSlice: StateCreator<
  RephraseSlice,
  [],
  [],
  RephraseSlice
> = (set) => ({
  ...ininitalState,
  generateRephrasingBase: async (selectedText) => {
    set(() => ({
      waitingForServer: true,
    }));

    const response = await serverRequest({
      endpoint: '/setup-rephrasing',
      method: 'POST',
      inputBody: { input: selectedText },
    });

    if (!response) {
      set(() => ({
        waitingForServer: false,
        isErrorActive: true,
      }));
    } else {
      set(() => ({
        waitingForServer: false,
        originalText: selectedText,
        rephrasedText: response.result,
        isErrorActive: false,
      }));
    }
  },
  reset: async () => {
    set(() => ({
      ...resetState,
    }));
  },
});
