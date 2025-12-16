import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './index.config';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { IOpenQuestionEditorPayload, IOpenUserEditorPayload } from './index.types';

const global = createSlice({
  name: 'global',
  initialState,
  reducers: {
    /*Редактор пользователя - открыть*/
    openUserEditor: (state, action: PayloadAction<IOpenUserEditorPayload>) => {
      const { type, editableUser } = action.payload;

      state.userEditorType = type;
      state.editableUser = editableUser;
    },
    /*Редактор пользователя - закрыть*/
    closeUserEditor: (state) => {
      state.userEditorType = null;
      state.editableUser = null;
    },
    /*Редактор вопроса - открыть*/
    openQuestionEditor: (state, action: PayloadAction<IOpenQuestionEditorPayload>) => {
      const { type, editableQuestion } = action.payload;

      state.questionEditorType = type;
      state.editableQuestion = editableQuestion;
    },
    /*Редактор вопроса - закрыть*/
    closeQuestionEditor: (state) => {
      state.questionEditorType = null;
      state.editableQuestion = null;
    },
    /*Сбросить состояние*/
    clearCurrentResult: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { actions } = global;

export default global.reducer;
