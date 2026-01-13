// Библиотеки
import { memo } from 'react';
import { Button } from '@mui/material';
// Логика
import { routes } from '@app/router';
import { useNavigate } from '@/app/hooks';

const BtnLogo = () => {
  const { isAdminPage, isQuizPage, isLoginPage, navigateTo } = useNavigate();

  const handelClickBtn = () => {
    if (isAdminPage) {
      navigateTo({ to: routes.main });
    } else {
      navigateTo({ to: routes.admin });
    }
  };

  return (
    <Button onClick={handelClickBtn} disabled={isLoginPage || isQuizPage}>
      <img
        src="/assets/images/logo.png"
        alt="АлёОпт"
        width={142}
        height={50}
        className="text-sm"
      />
    </Button>
  );
};

const MemoizedBtnLogout = memo(BtnLogo);
export { MemoizedBtnLogout as BtnLogo };
