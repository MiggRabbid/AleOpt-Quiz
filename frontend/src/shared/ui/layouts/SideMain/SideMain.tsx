import { Box } from '@mui/material';

interface ISideMainProps {
  children: React.ReactNode;
}

const SideMain = ({ children }: ISideMainProps) => {
  return (
    <Box
      className="shadow-glass border-glass relative flex shrink overflow-hidden rounded-2xl border backdrop-blur-sm"
      sx={{
        width: 'calc(100% - 320px - 14px) !important',
      }}
    >
      <Box className="bg-glass h-full w-full p-3.5">{children}</Box>
    </Box>
  );
};

export { SideMain };
