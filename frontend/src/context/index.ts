import { createContext } from 'react';

import { iUser } from '../store/authSlice'

interface AuthContextType {
  user: iUser | null;
  logIn: (data: iUser) => void;
  logOut: () => void;
  getAuthHeader: () => any;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logIn: () => {},
  logOut: () => {},
  getAuthHeader: () => {},
});

export default AuthContext;