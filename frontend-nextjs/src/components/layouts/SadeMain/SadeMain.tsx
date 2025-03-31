import { Box } from '@mui/material';

interface ISadeMainProps {
  children: React.ReactNode;
}

const SadeMain = ({ children }: ISadeMainProps) => {
  return (
    <Box className="grow-4 flex p-3.5 rounded-2xl shadow-block relative bg-white">
      {children}
    </Box>
  );
};

export { SadeMain };
