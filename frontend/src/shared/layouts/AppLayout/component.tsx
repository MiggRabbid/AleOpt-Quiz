// Библиотеки
import { memo, useLayoutEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
// Логика
import { routes } from '@/app/router';
import { useAuthContext, useNavigate } from '@/app/hooks';
// Компоненты
import { AppHeader } from '@/widgets/AppHeader';
// Типизация
import type { FC, ReactNode } from 'react';
import { SideFull } from '@/shared/layouts';

interface IAppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  const { navigateTo } = useNavigate();
  const { isTokenChecking, isTokenError } = useAuthContext();

  useLayoutEffect(() => {
    if (isTokenError) {
      navigateTo({ to: routes.login, replace: true });
    }
  }, [isTokenError]);

  return (
    <Box className="flex w-full flex-col justify-start text-slate-900">
      <AppHeader />
      {!isTokenChecking ? (
        children
      ) : (
        <SideFull id="AppLayout" type="login">
          <CircularProgress
            color="success"
            className="mx-auto h-40! min-h-40! w-40! min-w-40!"
          />
        </SideFull>
      )}
    </Box>
  );
};

export default memo(AppLayout);
