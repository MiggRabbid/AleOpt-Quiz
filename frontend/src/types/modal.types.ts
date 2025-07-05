/* eslint-disable no-unused-vars */
import { iUser } from './staff.types';

export enum TTypeModal {
  newUser = 'newUser',
  editUser = 'editUser',
  deleteUser = 'deleteUser',
}

export interface iModalSlice {
  userEditorType: null | TTypeModal;
  editableUser: null | iUser;
}
