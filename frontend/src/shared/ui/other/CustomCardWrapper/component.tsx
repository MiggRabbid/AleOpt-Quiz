import { memo } from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';

import type { FC, ReactNode } from 'react';

interface ICustomCardWrapperProps {
  children: ReactNode;
  shadowSize?: 'shadow-none' | 'shadow-xl' | 'shadow-lg' | 'shadow-md' | 'shadow-sm';
  shadowBaseSize?: 'shadow-none' | 'shadow-xl' | 'shadow-lg' | 'shadow-md' | 'shadow-sm';
  roundedSize?:
    | 'rounded-none'
    | 'rounded-sm'
    | 'rounded-md'
    | 'rounded-lg'
    | 'rounded-xl'
    | 'rounded-2xl'
    | 'rounded-3xl'
    | 'rounded-full';
}

const CustomCardWrapper: FC<ICustomCardWrapperProps> = ({
  children,
  shadowSize,
  shadowBaseSize,
  roundedSize,
}) => {
  const wrapperClass = clsx(
    'w-full! h-fit! p-0! m-0! transition-shadow duration-500',
    shadowBaseSize ? shadowBaseSize : 'shadow-none',
    shadowSize ? `hover:${shadowSize}` : 'hover:shadow-xl',
    roundedSize ? `${roundedSize}` : 'rounded-2xl',
  );
  return <Box className={wrapperClass}>{children}</Box>;
};

const MemoCustomCardWrapper = memo(CustomCardWrapper);

export { MemoCustomCardWrapper as CustomCardWrapper };
