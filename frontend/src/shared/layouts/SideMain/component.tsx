import { Box } from '@mui/material';
import clsx from 'clsx';

import type { CSSProperties, FC } from 'react';

interface ISideMainProps {
  children: React.ReactNode;
  otherClass?: string;
  style?: CSSProperties;
}

const SideMain: FC<ISideMainProps> = ({ otherClass, style, children }) => {
  const className = clsx(
    `shadow-glass border-glass relative flex h-full w-full rounded-2xl border backdrop-blur-sm`,
    otherClass,
  );
  return (
    <Box className={className} data-side-type="SideMain" style={style}>
      <Box className="bg-glass h-full w-full rounded-2xl p-3.5">{children}</Box>
    </Box>
  );
};

export default SideMain;
