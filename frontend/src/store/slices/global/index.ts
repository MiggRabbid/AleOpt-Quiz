import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './index.config';

import type { PayloadAction } from '@reduxjs/toolkit';
import { IOpenUserEditorPayload } from './index.types';

const global = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openUserEditor: (state, action: PayloadAction<IOpenUserEditorPayload>) => {
      console.group('handelClickOnDelete');
      const { type, editableUser } = action.payload;
      console.log('type         -', type);
      console.log('editableUser -', editableUser);
      state.userEditorType = type;
      state.editableUser = editableUser;
      console.groupEnd();
    },
    closeUserEditor: (state) => {
      state.userEditorType = null;
      state.editableUser = null;
    },

    clearCurrentResult: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { actions } = global;

export default global.reducer;
