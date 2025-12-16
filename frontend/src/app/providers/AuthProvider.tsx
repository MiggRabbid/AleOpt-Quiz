import { useMemo, useState } from 'react';

import { LocalKeyMap, useLocalStorage } from '@app/hooks';
import { AuthContext } from '@app/context';

import { UserRoles } from '@app/types';
import type { iResponseLogin } from '@app/types';
import type { ReactNode } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getLocalData, delLocalData, setLocalData } = useLocalStorage();
  const currentUser = getLocalData<LocalKeyMap.USER>({ key: LocalKeyMap.USER });
  const [user, setUser] = useState<iResponseLogin | null>(currentUser);
  const [token, setToken] = useState<string | null>(currentUser?.token ?? null);

  const clearUserData = () => {
    delLocalData({ key: LocalKeyMap.USER });
    delLocalData({ key: LocalKeyMap.RESULT });
    setUser(null);
  };

  const updateUserData = (newUser: iResponseLogin) => {
    setLocalData<LocalKeyMap.USER>({ key: LocalKeyMap.USER, data: newUser });
    setUser(newUser);
    setToken(newUser.token);
  };

  const getIsAdmin = (): boolean => {
    if (!user) return false;
    return user.role === UserRoles.Admin || user.role === UserRoles.Owner;
  };

  const isAuth = !!user?.token;

  const authValue = useMemo(
    () => ({
      user,
      clearUserData,
      updateUserData,
      token,
      getIsAdmin,
      isAuth,
    }),
    [user],
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
