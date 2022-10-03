import { RephraseSlice } from 'src/types/store';
import create from 'zustand';
import { AppSlice, createAppSlice } from './slices/appSlice';
import createRephraseSlice from './slices/rephrase';

type StoreState = RephraseSlice & AppSlice; // & OtherSlice

const useBoundStore = create<StoreState>()((...a) => ({
  ...createRephraseSlice(...a),
  ...createAppSlice(...a),
}));

export default useBoundStore;
