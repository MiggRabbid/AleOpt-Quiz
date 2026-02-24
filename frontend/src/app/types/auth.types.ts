import { UserGender, UserRoles } from '.';

export interface iResponseLogin {
  id: string;
  token: string;
  username: string;
  firstName: string;
  role: UserRoles;
  image: string;
  gender: UserGender;
}

export interface iRequestLogin {
  username: string;
  password: string;
}

export interface iRequestCheckToken {
  username: string;
  token: string;
}

export interface iAuthContext {
  user: iResponseLogin | null;
  updateUserData: (user: iResponseLogin) => void;
  clearUserData: () => void;
  token: string | null;
  getIsAdmin: () => boolean;
  isAuth: boolean;
  isTokenChecking: boolean;
  isTokenError: boolean;
}
