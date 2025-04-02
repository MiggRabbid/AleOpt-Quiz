import { Box } from '@mui/material';

interface ISideSecondProps {
  children: React.ReactNode;
}

const SideSecond = ({ children }: ISideSecondProps) => {
  return (
    <Box className="max-w-2xs grow p-3.5 rounded-2xl shadow-block bg-white">
      {children}
    </Box>
  );
};

export { SideSecond };
