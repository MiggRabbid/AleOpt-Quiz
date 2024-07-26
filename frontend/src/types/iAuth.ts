import { iUser } from './iUser';

export interface iAuthContext {
  user: iUser | null;
  userLogin: (data: iUser) => void;
  userLogout: () => void;
  getAuthHeader: () => unknown;
  isAdmin: (user: iUser) => boolean;
}

export interface iResponseLogin {
  status: string;
  data: iUser;
}
