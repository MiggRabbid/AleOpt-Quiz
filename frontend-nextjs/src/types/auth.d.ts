import { iUser } from './user';

export interface iAuthError {
  data: {
    message: string;
    errorType: string;
  };
  status: number;
}

export interface iAuthContext {
  authUser: iUser | null;
  // eslint-disable-next-line no-unused-vars
  userLogin: (data: iUser) => void;
  userLogout: () => void;
  getAuthHeader: () => unknown;
  // eslint-disable-next-line no-unused-vars
  isAdmin: (user: iUser) => boolean;
}

export interface iResponseLogin {
  status: string;
  data: iUser;
}
