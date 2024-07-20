import { createContext } from 'react';

import { iAuthContext } from '../../types/interfaces/iAuth';

const AuthContext = createContext<iAuthContext>({
  user: null,
  UseLogin: () => {},
  useLogout: () => {},
  getAuthHeader: () => {},
  isAdmin: () => false,
});

export default AuthContext;
