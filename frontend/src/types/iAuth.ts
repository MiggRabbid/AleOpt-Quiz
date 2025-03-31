import { iUser } from './iUser';

export interface iAuthError {
  data: {
    message: string;
    errorType: string;
  };
  status: number;
}

export interface iAuthContext {
  authUser: iUser | null;
  userLogin: (data: iUser) => void;
  userLogout: () => void;
  getAuthHeader: () => unknown;
  isAdmin: (user: iUser) => boolean;
}

export interface iResponseLogin {
  status: string;
  data: iUser;
}
