// Библиотеки
import { Box } from '@mui/material';
// Логика
import { useAuthContext, useNavigate } from '@/app/hooks';
// Компоненты
import { BtnLogo, BtnRedirect, BtnLogout } from './components';

const AppHeader = () => {
  const { isTokenChecking } = useAuthContext();
  const { isLoginPage } = useNavigate();

  if (isLoginPage) return null;

  return (
    <Box
      component="header"
      className="shadow-glass border-glass mx-2 mt-2 flex h-15 shrink-0 flex-row items-center justify-between self-stretch rounded-2xl border backdrop-blur-sm"
    >
      <Box className="bg-glass h-full w-full rounded-2xl px-3.5 py-2">
        <Box className="flex h-full w-full flex-row items-center justify-between">
          <Box className="flex max-w-25 min-w-30 items-center justify-center border-none">
            <BtnLogo />
          </Box>
          {!isTokenChecking && (
            <Box className="flex items-center justify-end gap-4">
              <BtnRedirect />
              <BtnLogout />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export { AppHeader };
