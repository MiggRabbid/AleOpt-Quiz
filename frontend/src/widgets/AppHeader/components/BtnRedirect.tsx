// Библиотеки
import { Box } from '@mui/material';
// Логика
import { useAuthContext, useNavigate } from '@app/hooks';
import { routes } from '@app/router';
// Компоненты
import { BtnSmall } from '@/shared/ui/btns';
import { CustomIcon } from '@/shared/ui';
// Типизация

export const BtnRedirect = () => {
  const { isAdminPage, is404LoginPage, isQuizPage, navigateTo } = useNavigate();
  const { user, getIsAdmin } = useAuthContext();

  const handelClickBtn = () => {
    if (isAdminPage || is404LoginPage) {
      navigateTo({ to: routes.main });
    } else {
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
        variant="contained"
        color="secondary"
        fullWidth
        disabled={isQuizPage}
        IconRight={<CustomIcon name="Home" />}
      />
    </Box>
  );
};
