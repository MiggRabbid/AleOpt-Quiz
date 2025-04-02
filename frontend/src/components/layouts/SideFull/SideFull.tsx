import { Box } from '@mui/material';

interface ISideFullProps {
  children: React.ReactNode;
}

const SideFull = ({ children }: ISideFullProps) => {
  return (
    <Box className="shadow-block relative m-3.5 flex min-h-full grow flex-row overflow-hidden rounded-2xl bg-white">
      {children}
    </Box>
  );
};

export { SideFull };
