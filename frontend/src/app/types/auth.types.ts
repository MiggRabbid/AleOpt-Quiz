import { UserRoles } from '.';

export interface iAuthError {
  data: {
    message: string;
    errorType: string;
  };
  status: number;
}

export interface iResponseLogin {
  id: string;
  token: string;
  username: string;
  firstName: string;
  role: UserRoles;
  image: string;
  gender: 'male' | 'female';
}

export interface iRequestLogin {
  username: string;
  password: string;
}