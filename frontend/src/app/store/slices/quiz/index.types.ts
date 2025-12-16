import type { iQuestion, iUser, TTypeModal } from '@/app/types';

export interface IOpenUserEditorPayload {
  type: TTypeModal;
  editableUser: null | iUser;
}

export interface IOpenQuestionEditorPayload {
  type: TTypeModal;
  editableQuestion: null | iQuestion;
}
