'use client';
// Библиотеки
// Компоненты
import { BtnSmall } from '@/shared/ui/btns';
// Типизация
import { Box } from '@mui/material';
// import { usePageParams } from '@/hooks';

export const BtnRedirect = () => {
  // const { isNotUser, isModerator, isLoginPage, is404Page, isAdminPage } = usePageParams();

  const isAdminPage = window.location.pathname.includes('/admin');
  // if (!isModerator || isNotUser || isLoginPage || is404Page) return null;

  const handelClickBtn = () => {
    console.group('handelClickBtn');
    // console.log('isAdminPage -', isAdminPage);
    // if (isAdminPage) {
    //   console.log('router.push(routes.profile)');
    //   router.push(routes.profile);
    // } else {
    //   console.log('router.push(routes.admin)');
    //   router.push(routes.admin);
    // }
    console.groupEnd();
  };

  const getBtnText = () => {
    if (isAdminPage) {
      return 'На главную';
    } else {
      return 'В админку';
    }
  };

  return (
    <Box className="h-fir w-40">
      <BtnSmall
        btnText={getBtnText()}
        btnClick={handelClickBtn}
        variant="text"
        fullWidth
      />
    </Box>
  );
};
