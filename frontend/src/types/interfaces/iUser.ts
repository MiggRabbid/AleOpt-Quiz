// eslint-disable-next-line no-shadow
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
  results?: Array<Record<string, string>>;
}

export interface iUserAnswer {
  id: string;
  userAnswerId: string;
  correctAnswerId: string;
  result: number;
}

export interface iUsersState {
  users: iUser[] | null;
}
