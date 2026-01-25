// Библиотеки
import { memo, useLayoutEffect } from 'react';
// Логика
import { useAuthContext, useNavigate } from '@app/hooks';
import { routes } from '@app/router';
// Типизация
import type { FC, ReactElement } from 'react';

interface IPrivateOutletProps {
  children: ReactElement;
}

const PrivateOutlet: FC<IPrivateOutletProps> = ({ children }) => {
  const { navigateTo, isLoginPage, isAdminPage } = useNavigate();
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
  }, [isAuth, isAdmin, isLoginPage, isAdminPage]);

  return children;
};

const PrivateOutletMemo = memo(PrivateOutlet);

export { PrivateOutletMemo as PrivateOutlet };
