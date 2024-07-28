import { typeModelData } from './types';

// eslint-disable-next-line no-shadow
export enum FabricModalType {
  newUser = 'newUserModal',
  editUser = 'editUserModal',
  newQuestion = 'newQuestionModal',
  editQuestion = 'editQuestionModal',
  delConfirm = 'showDeleteModal',
  defaultValue = '',
}

export interface iModalSlice {
  modalState: boolean;
  modalType: FabricModalType;
  modalData: typeModelData;
}
