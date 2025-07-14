/* eslint-disable no-unused-vars */
import { iQuestion } from './quiz.types';
import { iUser } from './staff.types';

export enum TTypeModal {
  new = 'new',
  edit = 'edit',
  delete = 'delete',
}

export interface iModalSlice {
  userEditorType: null | TTypeModal;
  editableUser: null | iUser;
  questionEditorType: null | TTypeModal;
  editableQuestion: null | iQuestion;
}
