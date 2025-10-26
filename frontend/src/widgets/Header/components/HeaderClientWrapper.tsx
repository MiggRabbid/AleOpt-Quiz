// Библиотеки
import { Box } from '@mui/material';
// Типизация
import { HeaderClientWrapperProps } from './header.types';

const HeaderClientWrapper = ({
  BtnLogo,
  BtnLogout,
  BtnRedirect,
}: HeaderClientWrapperProps) => {
  return (
    <>
      <Box sx={{ minWidth: '120px', maxWidth: '200px', border: 'none' }}>{BtnLogo}</Box>
      <Box className="flex items-center justify-end gap-4">
        {BtnRedirect}
        {BtnLogout}
      </Box>
    </>
  );
};

export { HeaderClientWrapper };
