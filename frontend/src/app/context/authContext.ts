import { createContext } from 'react';
import type { iAuthContext } from '@app/types';

const AuthContext = createContext<iAuthContext>({
  user: null,
  clearUserData: () => {},
  updateUserData: () => {},
  token: null,
  isAuth: false,
  getIsAdmin: () => false,
  isTokenChecking: true,
  isTokenError: false,
});

export { AuthContext };
