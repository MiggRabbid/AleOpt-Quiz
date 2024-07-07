/* eslint-disable import/no-cycle */
import { typeModelData, typeQuestionAnswer } from './types';

// eslint-disable-next-line no-shadow
export enum UserRoles {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Owner = 'OWNER',
}

// eslint-disable-next-line no-shadow
export enum FabricModalType {
  NewUser = 'showNewUserModal',
  newQuestion = 'showNewQuestionModal',
  delConfirm = 'showDeleteModal',
  defaultValue = '',
}

export interface iUser {
  _id?: string;
  role: UserRoles;
  firstName?: string;
  lastName?: string;
  username: string;
  password?: string;
  token?: string;
  results?: Array<Record<string, string>>;
}

export interface iAuthContext {
  user: iUser | null;
  UseLogin: (data: iUser) => void;
  useLogout: () => void;
  getAuthHeader: () => unknown;
  isAdmin: (user: iUser) => boolean;
}

export interface iUserAnswer {
  id: string;
  userAnswerId: string;
  correctAnswerId: string;
  result: number;
}

export interface iQuestion {
  id: string;
  question: string;
  answers: typeQuestionAnswer[];
  correctAnswerId: string;
}

export interface iQuizState {
  isStarted: boolean;
  questionIndex: number;
  questions: iQuestion[];
  currentResult: iUserAnswer[];
}

export interface iUsersState {
  users: iUser[] | null;
}

export interface iResponseLogin {
  status: string;
  data: iUser;
}

export interface iResponseQuestions {
  status: string;
  data: iQuestion[];
}

export interface iFormInputProps {
  controlId: string;
  label: string;
  height: string;
  as: 'input' | 'textarea' | 'select';
  type?: 'text' | 'password';
  name: string;
  placeholder?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >,
  ) => void;
  isInvalid: boolean;
  options?: Record<string, string>;
  className?: string;
}

export interface iInputTextProps
  extends Omit<
    iFormInputProps,
    'height' | 'type' | 'options' | 'defaultValue'
  > {
  style: Record<string, string>;
}

export interface iInputPassProps
  extends Omit<
    iFormInputProps,
    'height' | 'as' | 'type' | 'options' | 'defaultValue'
  > {
  style: Record<string, string>;
}

export interface iInputSelectProps
  extends Omit<iFormInputProps, 'height' | 'as' | 'type'> {
  style: Record<string, string>;
}

export interface iModalSlice {
  modalState: boolean;
  modalType: FabricModalType;
  modalData: typeModelData;
}
