import serverRequest from 'src/utils/serverRequest';
import create, { StateCreator } from 'zustand';

interface RephraseSlice {
  originalSentence: string | null;
  rephrasedSentence: string | null;
  selectedWordIndex: number | null;
  alternatives: string[] | null;
  waitingForServer: boolean;
  generateRephrasingBase: (selectedText: string) => void;
}

const createRephraseSlice: StateCreator<
  RephraseSlice,
  [],
  [],
  RephraseSlice
> = (set) => ({
  originalSentence: null,
  rephrasedSentence: null,
  selectedWordIndex: null,
  alternatives: null,
  waitingForServer: false,
  generateRephrasingBase: async (selectedSentence) => {
    set(() => ({
      waitingForServer: true,
    }));
    const response = await serverRequest({
      endpoint: '/generate-rephrasing-base',
      method: 'POST',
      inputBody: { input: selectedSentence },
    });

    set(() => ({
      waitingForServer: false,
      originalSentence: selectedSentence,
      rephrasedSentence: response.result,
    }));
  },
});

type StoreState = RephraseSlice; // & OtherSlice

const useBoundStore = create<StoreState>()((...a) => ({
  ...createRephraseSlice(...a),
}));

export default useBoundStore;
