import clsx from 'clsx';
import { Box } from '@mui/material';
import type { CSSProperties, FC, ReactNode } from 'react';

interface ISideFullProps {
  children: ReactNode;
  id: string;
  type?: 'login' | 'main';
  otherClass?: string;
  style?: CSSProperties;
}

const SideFull: FC<ISideFullProps> = ({ children, id, type = 'main', otherClass }) => {
  const className = clsx(
    `h-fit grid grow shrink rounded-2xl`,
    type === 'login'
      ? 'p-10 gap-10 items-center justify-center'
      : 'mx-2 my-4.5 gap-3.5 grid-cols-[260px_1fr] lg:grid-cols-[290px_1fr] xl:grid-cols-[320px_1fr]',
    otherClass,
  );

  return (
    <Box className={className} id={id} data-side-type="SideFull">
      {children}
    </Box>
  );
};

export default SideFull;
