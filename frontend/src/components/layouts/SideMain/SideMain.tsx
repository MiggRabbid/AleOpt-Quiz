import { Box } from '@mui/material';

interface ISideMainProps {
  children: React.ReactNode;
}

const SideMain = ({ children }: ISideMainProps) => {
  return (
    <Box
      className="shadow-block relative flex shrink rounded-2xl bg-white p-5"
      sx={{
        width: 'calc(100% - 320px - 14px) !important',
      }}
    >
      {children}
    </Box>
  );
};

export { SideMain };
