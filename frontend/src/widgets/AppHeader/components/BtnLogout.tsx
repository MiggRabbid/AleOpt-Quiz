// Библиотеки
import React from 'react';
import { Box } from '@mui/material';
// Логика
import { useAuthContext, useNavigate } from '@/app/hooks';
import { routes } from '@app/router';
// Компоненты
import { BtnSmall } from '@/shared/ui/btns';
import { CustomIcon } from '@/shared/ui/CustomIcon';

const BtnLogout = () => {
  const { is404LoginPage, isLoginPage, isQuizPage, navigateTo } = useNavigate();
  const { clearUserData } = useAuthContext();

  const handelClickBtn = async () => {
    clearUserData();
    navigateTo({ to: routes.login });
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
        disabled={isQuizPage}
      />
    </Box>
  );
};

const MemoizedBtnLogout = React.memo(BtnLogout);
export { MemoizedBtnLogout as BtnLogout };
