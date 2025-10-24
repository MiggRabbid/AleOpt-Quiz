'use client';

import { Box } from '@mui/material';

import { BtnLogo } from './components/BtnLogo';
import { BtnRedirect } from './components/BtnRedirect';
import { BtnLogout } from './components/BtnLogout';

const AppHeader = () => {
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
          <Box sx={{ minWidth: '120px', maxWidth: '200px', border: 'none' }}>
            <BtnLogo />
          </Box>
          <Box className="flex items-center justify-end gap-4">
            <BtnRedirect />
            <BtnLogout />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { AppHeader };
