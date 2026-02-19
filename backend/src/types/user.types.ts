import type { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Document } from 'mongoose';
import { IErrorResponse } from './errors.types';
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
  createdAt: Date;
  updatedAt?: Date;
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
  createdAt: Date;
  updatedAt?: Date;
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
  updatedAt: Date;
}

export type TUserRes = IResponseShortUser | IErrorResponse;
export type TAllUsersRes = IResponseUser[] | IErrorResponse;

export type TUserCustomRequest = Request<ParamsDictionary, any, ICreateUserData, IUserQuery>;
export type TUserCustomResponse = Response<TAllUsersRes>;
