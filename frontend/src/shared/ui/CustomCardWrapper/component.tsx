import { Box } from '@mui/material';
import clsx from 'clsx';

import { memo, type ReactNode } from 'react';

interface ICustomCardWrapperProps {
  children: ReactNode;
  shadowSize?: 'shadow-none' | 'shadow-xl' | 'shadow-lg' | 'shadow-md' | 'shadow-sm';
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

const CustomCardWrapper = ({
  children,
  shadowSize,
  roundedSize,
}: ICustomCardWrapperProps) => {
  const wrapperClass = clsx(
    'w-fit!s h-fit! p-0! m-0! shadow-none transition-shadow duration-500 overflow-hidden',
    shadowSize ? `hover:${shadowSize}` : 'hover:shadow-xl',
    roundedSize ? `${roundedSize}` : 'rounded-2xl',
  );
  return <Box className={wrapperClass}>{children}</Box>;
};

const MemoCustomCardWrapper = memo(CustomCardWrapper);

export { MemoCustomCardWrapper as CustomCardWrapper };
