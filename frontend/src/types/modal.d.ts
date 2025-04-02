/* eslint-disable no-unused-vars */
import { typeModelData } from './types';

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
