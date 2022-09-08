import { RephraseSlice, RephraseState } from 'src/types/store';
import serverRequest from 'src/utils/serverRequest';
import { StateCreator } from 'zustand';

const ininitalState: RephraseState = {
  originalSentence: null,
  rephrasedSentence: null,
  selectedWordIndex: null,
  alternatives: null,
  waitingForServer: false,
  isErrorActive: false,
};

const resetState: Omit<RephraseState, 'waitingForServer' | 'isErrorActive'> = {
  originalSentence: null,
  rephrasedSentence: null,
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
  generateRephrasingBase: async (selectedSentence) => {
    set(() => ({
      waitingForServer: true,
    }));

    const response = await serverRequest({
      endpoint: '/generate-rephrasing-base',
      method: 'POST',
      inputBody: { input: selectedSentence },
    });

    const controller = new AbortController();

    controller.abort();

    if (!response) {
      set(() => ({
        waitingForServer: false,
        isErrorActive: true,
      }));
    } else {
      set(() => ({
        waitingForServer: false,
        originalSentence: selectedSentence,
        rephrasedSentence: response.result,
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
