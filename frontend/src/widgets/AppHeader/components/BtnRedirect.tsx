// Библиотеки
import { Box } from '@mui/material';
// Логика
import { useAuthContext, useNavigate } from '@app/hooks';
import { routes } from '@app/router';
// Компоненты
import { BtnSmall } from '@/shared/ui/btns';
// Типизация

export const BtnRedirect = () => {
  const { isAdminPage, is404LoginPage, isQuizPage, navigateTo } = useNavigate();
  const { user, getIsAdmin } = useAuthContext();

  const handelClickBtn = () => {
    console.group('BtnRedirect / handelClickBtn');
    console.log('location    -', location.pathname);
    console.log('isAdminPage -', isAdminPage);
    console.log('is404LoginPage -', is404LoginPage);

    if (isAdminPage || is404LoginPage) {
      console.log('IF / isAdminPage || is404LoginPage');
      console.groupEnd();
      navigateTo({ to: routes.main });
    } else {
      console.log('ELSE');
      console.groupEnd();
      navigateTo({ to: routes.admin });
    }
  };

  const getBtnText = () => {
    return isAdminPage ? 'На главную' : 'В админку';
  };

  if (!user || !getIsAdmin()) return null;

  return (
    <Box className="h-fir w-40">
      <BtnSmall
        btnText={getBtnText()}
        btnClick={handelClickBtn}
        variant="text"
        fullWidth
        disabled={isQuizPage}
      />
    </Box>
  );
};
