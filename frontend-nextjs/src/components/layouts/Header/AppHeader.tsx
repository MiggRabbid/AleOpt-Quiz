import { Box } from '@mui/material';
import { BtnLogo } from './components/BtnLogo';

const AppHeader = () => {
  return (
    <Box
      component="header"
      className="w-full h-fit shadow-main py-2.5  px-3.5 shadow-block! bg-white"
    >
      <Box component="nav">
        <Box sx={{ minWidth: '120px', maxWidth: '200px' }}>
          <BtnLogo />
        </Box>
      </Box>
    </Box>
  );
};

export { AppHeader };
