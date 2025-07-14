import { TTypeModal } from '@/types/modal.types';
import { iQuestion } from '@/types/quiz.types';
import { iUser } from '@/types/staff.types';

export interface IOpenUserEditorPayload {
  type: TTypeModal;
  editableUser: null | iUser;
}

export interface IOpenQuestionEditorPayload {
  type: TTypeModal;
  editableQuestion: null | iQuestion;
}
