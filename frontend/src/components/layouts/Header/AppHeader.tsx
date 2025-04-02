import { Box } from '@mui/material';
import { BtnLogo } from './components/BtnLogo';
import { BtnLogout } from '@/components/layouts/Header/components/BtnLogout';

const AppHeader = () => {
  return (
    <Box
      component="header"
      className="shadow-main shadow-block! flex h-fit w-full flex-row items-center justify-between bg-white px-3.5 py-2.5"
    >
      <Box component="nav">
        <Box sx={{ minWidth: '120px', maxWidth: '200px' }}>
          <BtnLogo />
        </Box>
      </Box>
      <Box>
        <BtnLogout />
      </Box>
    </Box>
  );
};

export { AppHeader };
