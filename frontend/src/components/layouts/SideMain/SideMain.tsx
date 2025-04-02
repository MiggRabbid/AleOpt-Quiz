import { Box } from '@mui/material';

interface ISideMainProps {
  children: React.ReactNode;
}

const SideMain = ({ children }: ISideMainProps) => {
  return (
    <Box className="grow-4 flex p-3.5 rounded-2xl shadow-block relative bg-white">
      {children}
    </Box>
  );
};

export { SideMain };
