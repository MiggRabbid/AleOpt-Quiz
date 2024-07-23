import { createContext } from 'react';

import { iAuthContext } from '../../types/iAuth';

const AuthContext = createContext<iAuthContext>({
  user: null,
  UseLogin: () => {},
  useLogout: () => {},
  getAuthHeader: () => {},
  isAdmin: () => false,
});

export default AuthContext;
