import clsx from 'clsx';
import { Box } from '@mui/material';
import type { CSSProperties } from 'react';

interface ISideFullProps {
  children: React.ReactNode;
  id: string;
  type?: 'login' | 'main';
  otherClass?: string;
  style?: CSSProperties;
}

const SideFull = ({ children, id, type = 'main', otherClass, style }: ISideFullProps) => {
  const className = clsx(
    `h-fit grid grow shrink rounded-2xl`,
    type === 'login'
      ? 'p-10 gap-10 items-center justify-center'
      : 'mx-6 my-4.5 gap-3.5 grid-cols-[320px_1fr]',
    otherClass,
  );

  return (
    <Box
      className={className}
      id={id}
      data-side-type="SideFull"
      style={{
        minHeight: 'calc(100dvh - 60px - 8px - 18px - 18px - 1px)',
        ...style,
      }}
    >
      {children}
    </Box>
  );
};

export default SideFull;
