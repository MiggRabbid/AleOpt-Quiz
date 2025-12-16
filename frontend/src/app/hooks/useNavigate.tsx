import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate as useTanstackNavigate } from '@tanstack/react-router';

import { routes, type TRoutesValues } from '@app/router';

const useNavigate = () => {
  const navigate = useTanstackNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  const isLoginPage = location.pathname === routes.login;
  const isAdminPage = location.pathname === routes.admin;
  const isQuizPage = location.pathname === routes.quiz;
  const is404LoginPage = useMemo(
    () => !Object.values(routes).some((route) => route === currentPath),
    [routes, currentPath],
  );

  const navigateTo = useCallback(
    ({ to, replace = false }: { to: TRoutesValues; replace?: boolean }) => {
      navigate({ to: to, replace: replace });
    },
    [navigate],
  );

  return {
    currentPath,
    isLoginPage,
    isQuizPage,
    isAdminPage,
    is404LoginPage,
    navigateTo,
  };
};

export default useNavigate;
