import { Box } from '@mui/material';

import type { FC } from 'react';

interface ISideSecondProps {
  children: React.ReactNode;
}

const SideSecond: FC<ISideSecondProps> = ({ children }) => {
  return (
    <Box
      className="shadow-glass border-glass h-full rounded-2xl border backdrop-blur-sm"
      data-side-type="SideSecond"
    >
      <Box className="bg-glass h-full w-full rounded-2xl p-3.5">{children}</Box>
    </Box>
  );
};

export default SideSecond;
