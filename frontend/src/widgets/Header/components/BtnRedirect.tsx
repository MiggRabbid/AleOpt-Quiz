'use client';
// Библиотеки
import { useRouter } from 'next/navigation';
// Компоненты
import { routes } from '@/shared/config/routes';
import { BtnSmall } from '@/shared/ui/ui/btns';
// Типизация
import { Box } from '@mui/material';
import { usePageParams } from '@/hooks';

export const BtnRedirect = () => {
  const router = useRouter();

  const { isNotSession, isModerator, isLoginPage, is404Page, isAdminPage } =
    usePageParams();

  if (!isModerator || isNotSession || isLoginPage || is404Page) return null;

  const handelClickBtn = () => {
    if (isAdminPage) {
      router.push(routes.profile);
    } else {
      router.push(routes.admin);
    }
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
