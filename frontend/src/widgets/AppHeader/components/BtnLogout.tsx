// Библиотеки
import React from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from '@tanstack/react-router';
// Логика
import { useAuthContext } from '@/app/hooks';
import { routes } from '@app/router';
// Компоненты
import { BtnSmall } from '@/shared/ui/btns';
import { CustomIcon } from '@/shared/ui/CustomIcon';

const BtnLogout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearUserData } = useAuthContext();

  const isLoginPage = location.pathname === routes.login;
  const is404LoginPage = !Object.values(routes).some(
    (route) => route === location.pathname,
  );

  const handelClickBtn = async () => {
    clearUserData();
    navigate({ to: routes.login });
  };

  if (isLoginPage || is404LoginPage) return null;

  return (
    <Box className="h-fir w-40">
      <BtnSmall
        btnText="Выход"
        btnClick={handelClickBtn}
        variant="text"
        fullWidth
        IconRight={<CustomIcon name="Logout" />}
      />
    </Box>
  );
};

const MemoizedBtnLogout = React.memo(BtnLogout);
export { MemoizedBtnLogout as BtnLogout };
