import { Box } from '@mui/material';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/authOptions';

import { BtnLogo } from './components/BtnLogo';
import { BtnRedirect } from './components/BtnRedirect';
import { BtnLogout } from './components/BtnLogout';

import { UserRoles } from '@/types/staff.types';

const AppHeader = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const isAdminOrOwner =
    session?.user.role === UserRoles.Admin || session?.user.role === UserRoles.Owner;

  return (
    <Box
      component="header"
      className="shadow-main shadow-block! flex h-fit min-h-15 w-full flex-row items-center justify-between bg-white px-3.5 py-2.5"
    >
      <Box component="nav">
        <Box sx={{ minWidth: '120px', maxWidth: '200px', border: 'none' }}>
          <BtnLogo />
        </Box>
      </Box>
      <Box className="flex items-center justify-end gap-4">
        {isAdminOrOwner && <BtnRedirect isAdminOrOwner={isAdminOrOwner} />}
        <BtnLogout />
      </Box>
    </Box>
  );
};

export { AppHeader };
