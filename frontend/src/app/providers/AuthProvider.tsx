// Библиотеки
import { useCallback, useEffect, useMemo, useState } from 'react';
// Логика
import { useCheckToken } from '@app/api/hooks';
import { LocalKeyMap, useLocalStorage } from '@app/hooks';
import { routes } from '@app/router';
import { AuthContext } from '@app/context';
// Типизация
import { UserRoles } from '@app/types';
import type { iResponseLogin } from '@app/types';
import type { FC, ReactNode } from 'react';

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const { getLocalData, delLocalData, setLocalData } = useLocalStorage();

  const { mutateAsync } = useCheckToken({
    onSuccess: () => onSuccess(),
    onError: () => onError(),
  });

  const isLoginPage =
    typeof window !== 'undefined' && window.location.pathname === routes.login;

  const [isTokenChecking, setIsTokenChecking] = useState<boolean>(true);
  const [isTokenError, setIsTokenError] = useState<boolean>(false);

  const [user, setUser] = useState<iResponseLogin | null>(() =>
    getLocalData<LocalKeyMap.USER>({ key: LocalKeyMap.USER }),
  );
  const [token, setToken] = useState<string | null>(() => {
    const savedUser = getLocalData<LocalKeyMap.USER>({ key: LocalKeyMap.USER });
    return savedUser?.token ?? null;
  });

  const clearUserData = useCallback(() => {
    delLocalData({ key: LocalKeyMap.USER });
    delLocalData({ key: LocalKeyMap.RESULT });
    setUser(null);
    setToken(null);
  }, [delLocalData]);

  const updateUserData = useCallback(
    (newUser: iResponseLogin) => {
      setLocalData<LocalKeyMap.USER>({ key: LocalKeyMap.USER, data: newUser });
      setUser(newUser);
      setToken(newUser.token);
    },
    [setLocalData],
  );

  const getIsAdmin = useCallback((): boolean => {
    if (!user) return false;
    return user.role === UserRoles.Admin || user.role === UserRoles.Owner;
  }, [user]);

  const isAuth = !!token;

  useEffect(() => {
    if (isLoginPage) {
      setIsTokenChecking(false);
    } else if (!token || !user?.username) {
      setIsTokenChecking(false);
    } else {
      mutateAsync({ token, username: user.username });
    }
  }, []);

  const onError = () => {
    setIsTokenError(true);
    clearUserData();
    setIsTokenChecking(false);
  };

  const onSuccess = () => {
    console.log('useCheckToken / success');
    setIsTokenChecking(false);
  };

  const authValue = useMemo(
    () => ({
      user,
      token,
      isAuth,
      isTokenChecking,
      isTokenError,
      clearUserData,
      updateUserData,
      getIsAdmin,
    }),
    [user, token, isAuth, isTokenChecking, isTokenError],
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
