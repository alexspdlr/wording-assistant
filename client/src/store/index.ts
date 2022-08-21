import serverRequest from 'src/utils/serverRequest';
import create, { StateCreator } from 'zustand';

interface RephraseState {
  originalSentence: string | null;
  rephrasedSentence: string | null;
  selectedWordIndex: number | null;
  alternatives: string[] | null;
  waitingForServer: boolean;
  isErrorActive: boolean;
}

interface RephraseActions {
  generateRephrasingBase: (selectedText: string) => void;
  reset: () => void;
}

interface RephraseSlice extends RephraseState, RephraseActions {}

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

const createRephraseSlice: StateCreator<
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

type StoreState = RephraseSlice; // & OtherSlice

const useBoundStore = create<StoreState>()((...a) => ({
  ...createRephraseSlice(...a),
}));

export default useBoundStore;
