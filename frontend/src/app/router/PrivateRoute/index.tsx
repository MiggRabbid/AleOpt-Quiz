import { useLayoutEffect } from 'react';

import { useAuthContext, useNavigate } from '@app/hooks';
import { routes } from '@app/router';

import type { ReactElement } from 'react';

interface IPrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { navigateTo, isLoginPage, isAdminPage, is404LoginPage } = useNavigate();
  const { isAuth, getIsAdmin } = useAuthContext();

  const isAdmin = getIsAdmin();

  useLayoutEffect(() => {
    if (!isAuth && !isLoginPage) {
      navigateTo({ to: routes.login, replace: true });
      return;
    }
    if (isAuth && isLoginPage && isAdmin) {
      navigateTo({ to: routes.admin, replace: true });
      return;
    }
    if (isAuth && isLoginPage && !isAdmin) {
      navigateTo({ to: routes.main, replace: true });
      return;
    }
    if (isAuth && isAdminPage && !isAdmin) {
      navigateTo({ to: routes.main, replace: true });
      return;
    }
  }, [isAuth, navigateTo]);

  return children;
};

export { PrivateRoute };
