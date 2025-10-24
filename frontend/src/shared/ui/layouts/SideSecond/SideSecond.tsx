import { Box } from '@mui/material';

interface ISideSecondProps {
  children: React.ReactNode;
}

const SideSecond = ({ children }: ISideSecondProps) => {
  return (
    <Box className="shadow-glass border-glass w-xs shrink-0 grow-0 overflow-hidden rounded-2xl border backdrop-blur-sm">
      <Box className="bg-glass h-full w-full p-3.5">{children}</Box>
    </Box>
  );
};

export { SideSecond };
