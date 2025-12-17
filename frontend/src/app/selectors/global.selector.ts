import type { RootState } from '@app/store';
import type { iModalSlice } from '@app/types';

export const getGlobalStateField =
  <K extends keyof iModalSlice>(field: K) =>
  (state: RootState) =>
    state.global[field];
