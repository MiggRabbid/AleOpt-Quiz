import { iUser } from './iUser';

export interface iAuthContext {
  user: iUser | null;
  UseLogin: (data: iUser) => void;
  useLogout: () => void;
  getAuthHeader: () => unknown;
  isAdmin: (user: iUser) => boolean;
}

export interface iResponseLogin {
  status: string;
  data: iUser;
}
