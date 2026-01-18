import { Document } from 'mongoose';
// import { iAverageAttempts } from './statsTypes';

// eslint-disable-next-line no-shadow
export enum UserRoles {
  Admin = 'Admin',
  Employee = 'Employee',
  Owner = 'Owner',
}
// eslint-disable-next-line no-shadow
export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}
// eslint-disable-next-line no-shadow
export enum UserGender {
  Male = 'male',
  Female = 'female',
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
  gender: string | UserGender;
  status: string | UserStatus;
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
  gender: string | UserGender;
  status: string | UserStatus;
}

export interface iUpdateUserData {
  role: UserRoles;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  image?: string;
}
