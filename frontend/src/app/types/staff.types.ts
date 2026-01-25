import type { iHandledError, iResultEntry } from '.';

/* eslint-disable no-unused-vars */
export enum UserRoles {
  Admin = 'Admin',
  Employee = 'Employee',
  Owner = 'Owner',
}

export enum UserGender {
  male = 'male',
  female = 'female',
}

export const userGenderMap: Record<UserGender, string> = {
  male: 'Муж.',
  female: 'Жен.',
};

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export const userStatusMap: Record<UserStatus, string> = {
  active: 'Текущий',
  inactive: 'Бывший',
};

export const userRolesMap: Record<UserRoles, string> = {
  Admin: 'Администратор',
  Employee: 'Сотрудник',
  Owner: 'Владелец',
};

export interface IUserRequest {
  role: UserRoles;
  username: string;
  firstName: string;
  lastName: string;
  gender: UserGender;
  password?: string | undefined;
  image: string;
  status: UserStatus;
}

export interface iUser {
  _id?: string;
  role: UserRoles;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  token?: string;
  image?: string;
  gender: UserGender;
  status: UserStatus;
  results?: Array<Record<string, string>>;
  lastResult?: number | null;
  numberAttempts?: number;
}

export interface iUserAnswer {
  questionId: string;
  question: string;
  userAnswerId: string;
  correctAnswerId: string;
  result: number;
}

export interface iUsersState {
  users: iUser[] | null;
  currentUser: iUser | null;
}

export interface iUsersResponse {
  status: number;
  data: iUser[] | null;
  error: iHandledError | null;
}

export interface iResultEntryRequest extends Omit<iResultEntry, 'correctAnswers'> {}
