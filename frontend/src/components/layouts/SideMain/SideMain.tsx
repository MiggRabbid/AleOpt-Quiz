import { Box } from '@mui/material';

interface ISideMainProps {
  children: React.ReactNode;
}

const SideMain = ({ children }: ISideMainProps) => {
  return (
    <Box className="shadow-block relative flex grow-4 rounded-2xl bg-white p-3.5">
      {children}
    </Box>
  );
};

export { SideMain };
