import { createContext } from 'react';

import { iAuthContextType } from '../interfaces'


const AuthContext = createContext<iAuthContextType>({
  user: null,
  logIn: () => {},
  logOut: () => {},
  getAuthHeader: () => {},
  isAdmin: () => false,
});

export default AuthContext;