import { UserRoles } from '.';

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
