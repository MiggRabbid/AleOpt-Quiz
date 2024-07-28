import { Document } from 'mongoose';

export enum UserRoles {
  Admin = 'Admin',
  Employee = 'Employee',
  Owner = 'Owner',
}

export interface iRoleModel extends Document {
  value: UserRoles;
}

export interface iUserModel extends Document {
  _id?: string;
  role: string | iRoleModel;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  results?: Array<Record<string, string>>;
}
