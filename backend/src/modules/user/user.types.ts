import type { Document } from 'mongoose';

export enum UserRoles {
  Admin = 'Admin',
  Employee = 'Employee',
  Owner = 'Owner',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum UserGender {
  Male = 'male',
  Female = 'female',
}

export interface IRoleModel extends Document {
  value: UserRoles;
}

export interface IUserModel extends Document {
  _id: string;
  role: UserRoles;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  results?: Array<Record<string, string>>;
  image: string;
  gender: UserGender;
  status: UserStatus;
}

export interface IResponseUser {
  role: UserRoles;
  username: string;
  firstName: string;
  lastName: string;
  results?: Array<Record<string, string>>;
  lastResult: number | null;
  numberAttempts: number;
  image?: string;
  gender: string | UserGender;
  status: string | UserStatus;
}

export interface IResponseShortUser {
  role: string | IRoleModel;
  username: string;
  firstName: string;
  lastName: string;
  image?: string;
  gender: string | UserGender;
  status: string | UserStatus;
}

export interface IUserQuery {
  username?: string;
}

export interface ICreateUserData {
  role: UserRoles;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  image: string;
  gender: string | UserGender;
  status: string | UserStatus;
}

export interface IUpdateUserData {
  role: UserRoles;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  image?: string;
  status: string | UserStatus;
}
