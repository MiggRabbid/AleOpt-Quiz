import { useState, ReactNode, useMemo } from 'react';

import AuthContext from '../context/index';

import { iUser, UserRoles } from '../../types/interfaces/iUser';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log('----- AuthProvider');
  const currentUserString = localStorage.getItem('user');
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const [user, setUser] = useState(currentUser);

  const UseLogin = (data: iUser) => {
    if (data === undefined) return;
    localStorage.setItem('user', JSON.stringify(data));
    setUser({
      role: data.role,
      username: data.username,
      token: data.token,
    });
  };

  const useLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (localUser && localUser.token) {
      return { Authorization: `Bearer ${localUser.token}` };
    }
    return {};
  };

  const isAdmin = (verifiableUser: iUser): boolean =>
    verifiableUser.role === UserRoles.Admin;

  const authValue = useMemo(
    () => ({
      user,
      UseLogin,
      useLogout,
      getAuthHeader,
      isAdmin,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
