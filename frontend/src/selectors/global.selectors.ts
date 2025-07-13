import { RootState } from '@/store';
import { iModalSlice } from '@/types/modal.types';

export const getGlobalStateField =
  <K extends keyof iModalSlice>(field: K) =>
  (state: RootState) =>
    state.global[field];
