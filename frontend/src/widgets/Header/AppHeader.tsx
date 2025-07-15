import { Box } from '@mui/material';

import { BtnLogo } from './components/BtnLogo';
import { BtnRedirect } from './components/BtnRedirect';
import { BtnLogout } from './components/BtnLogout';

const AppHeader = async () => {
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
        <BtnRedirect />
        <BtnLogout />
      </Box>
    </Box>
  );
};

export { AppHeader };
