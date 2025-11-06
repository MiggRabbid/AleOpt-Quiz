import { Document } from 'mongoose';
// import { iAverageAttempts } from './statsTypes';

export enum UserRoles {
  Admin = 'Admin',
  Employee = 'Employee',
  Owner = 'Owner',
}

export interface iRoleModel extends Document {
  value: UserRoles;
}

export interface iUserModel extends Document {
  _id: string;
  role: string | iRoleModel;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  results?: Array<Record<string, string>>;
  image: string;
  gender: 'male' | 'female';
}

export interface iResponseUser {
  role: string | iRoleModel;
  firstName: string;
  lastName: string;
  username: string;
  results?: Array<Record<string, string>>;
  lastResult: number | null;
  numberAttempts: number;
  image?: string;
  gender: 'male' | 'female';
}

export interface iUpdateUserData {
  role: string;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  image?: string;
}
