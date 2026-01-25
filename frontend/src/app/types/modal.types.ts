/* eslint-disable no-unused-vars */
import type { iQuestion, iUser } from '.';

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
