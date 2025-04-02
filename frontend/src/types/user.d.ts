/* eslint-disable no-unused-vars */
export enum UserRoles {
  Admin = 'Admin',
  Employee = 'Employee',
  Owner = 'Owner',
}

export interface iUser {
  _id?: string;
  role: UserRoles;
  firstName?: string;
  lastName?: string;
  username: string;
  password?: string;
  token?: string;
  image?: string;
  results?: Array<Record<string, string>>;
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

export interface iResultEntry {
  data: string;
  answers: iUserAnswer[];
  correctAnswers: number;
}

export interface iResultEntryRequest extends Omit<iResultEntry, 'correctAnswers'> {}
