// Библиотеки
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
// Логика
import { routes } from '@/shared/config/routes';
import { authOptions } from '@/shared/lib';
// Компоненты
import { BtnLogo, BtnRedirect, BtnLogout, HeaderClientWrapper } from './components';

const AppHeader = async () => {

  return (
    <Box
      component="header"
      className="shadow-glass border-glass mx-4 mt-2 flex h-fit shrink-0 flex-row items-center justify-between overflow-hidden rounded-2xl border backdrop-blur-sm"
    >
      <Box className="bg-glass h-fit w-full px-3.5 py-2">
        <Box
          component="nav"
          className="flex w-full! flex-row items-center justify-between"
        >
          <HeaderClientWrapper
            BtnLogo={<BtnLogo />}
            BtnRedirect={<BtnRedirect />}
            BtnLogout={<BtnLogout />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { AppHeader };
