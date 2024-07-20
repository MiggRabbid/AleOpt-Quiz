import { typeModelData } from '../types';

// eslint-disable-next-line no-shadow
export enum FabricModalType {
  NewUser = 'showNewUserModal',
  newQuestion = 'showNewQuestionModal',
  delConfirm = 'showDeleteModal',
  defaultValue = '',
}

export interface iModalSlice {
  modalState: boolean;
  modalType: FabricModalType;
  modalData: typeModelData;
}
