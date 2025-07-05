import { TTypeModal } from '@/types/modal.types';
import { iUser } from '@/types/staff.types';

export interface IOpenUserEditorPayload {
  type: TTypeModal;
  editableUser: null | iUser;
}
