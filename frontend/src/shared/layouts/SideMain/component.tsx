import { Box } from '@mui/material';
import clsx from 'clsx';

import type { CSSProperties, FC, ReactNode } from 'react';

interface ISideMainProps {
  children: ReactNode;
  otherClass?: string;
  style?: CSSProperties;
}

const SideMain: FC<ISideMainProps> = ({ otherClass, children }) => {
  const className = clsx(
    `shadow-glass border-glass relative flex h-full w-full rounded-2xl border backdrop-blur-sm`,
    otherClass,
  );
  return (
    <Box className={className} data-side-type="SideMain">
      <Box className="bg-glass w-full rounded-2xl p-3.5">{children}</Box>
    </Box>
  );
};

export default SideMain;
