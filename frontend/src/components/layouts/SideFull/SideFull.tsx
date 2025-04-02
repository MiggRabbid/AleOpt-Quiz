import { Box } from '@mui/material';

interface ISideFullProps {
  children: React.ReactNode;
}

const SideFull = ({ children }: ISideFullProps) => {
  return (
    <Box className="flex flex-row grow m-3.5 min-h-full rounded-2xl shadow-block relative overflow-hidden bg-white">
      {children}
    </Box>
  );
};

export { SideFull };
