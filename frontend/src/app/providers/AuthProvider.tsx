import { useState, ReactNode, useMemo } from 'react';

import AuthContext from '../context/index';
import useLocalStorage from '../../hooks/useLocalStorage';

import { iUser, UserRoles } from '../../types/iUser';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentUser = useLocalStorage.getUser();
  const [user, setUser] = useState(currentUser);

  const userLogin = (data: iUser) => {
    if (data === undefined) return;
    useLocalStorage.delResult();
    useLocalStorage.setUser(data);
    setUser({
      role: data.role,
      username: data.username,
      token: data.token,
    });
  };

  const userLogout = () => {
    useLocalStorage.delResult();
    useLocalStorage.delUser();
    setUser(null);
  };

  const getAuthHeader = () => {
    const localUser = useLocalStorage.getUser();
    if (!!localUser && localUser.token) {
      return { Authorization: `Bearer ${localUser.token}` };
    }
    return {};
  };

  const isAdmin = (verifiableUser: iUser): boolean =>
    verifiableUser.role === UserRoles.Admin;

  const authValue = useMemo(
    () => ({
      user,
      userLogin,
      userLogout,
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
