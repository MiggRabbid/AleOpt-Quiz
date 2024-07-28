import { createContext } from 'react';

import { iAuthContext } from '../../types/iAuth';

const AuthContext = createContext<iAuthContext>({
  user: null,
  userLogin: () => {},
  userLogout: () => {},
  getAuthHeader: () => {},
  isAdmin: () => false,
});

export default AuthContext;
