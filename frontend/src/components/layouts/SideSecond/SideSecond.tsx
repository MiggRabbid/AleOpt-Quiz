import { Box } from '@mui/material';

interface ISideSecondProps {
  children: React.ReactNode;
}

const SideSecond = ({ children }: ISideSecondProps) => {
  return (
    <Box className="shadow-block w-xs shrink-0 grow-0 rounded-2xl bg-white p-3.5">
      {children}
    </Box>
  );
};

export { SideSecond };
