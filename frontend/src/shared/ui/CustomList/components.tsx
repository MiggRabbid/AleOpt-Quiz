import { Box, List, ListItem } from '@mui/material';
import clsx from 'clsx';

import type { ReactNode } from 'react';

interface ICustomListProps {
  classNames?: string;
  dataComponentType?: string;
  children: ReactNode;
}

interface ICustomListItemProps {
  classNames?: string;
  shadowSize?: 'shadow-none!' | 'shadow-sm' | 'shadow-md!' | 'shadow-xl!';
  paddingX?: 'px-0!' | 'px-2!' | 'px-4!' | 'px-6!' | 'px-8!' | 'px-10!';
  paddingY?: 'py-0!' | 'py-2!' | 'py-4!' | 'py-6!' | 'py-8!' | 'py-10!';
  children: ReactNode;
}

export const CustomList = ({
  children,
  classNames = '',
  dataComponentType,
}: ICustomListProps) => {
  const wrapperClassName = clsx('h-full w-full overflow-y-auto!', classNames);
  return (
    <Box
      className="flex h-full w-full items-center justify-center"
      data-component-type={dataComponentType ?? 'CustomList'}
    >
      <Box className={wrapperClassName}>
        <List className="flex shrink-1 flex-col gap-3 px-4!">{children}</List>
      </Box>
    </Box>
  );
};

export const CustomListItem = ({
  children,
  classNames = '',
  shadowSize = 'shadow-md!',
  paddingX = 'px-4!',
  paddingY = 'py-4!',
}: ICustomListItemProps) => {
  const ItemClassName = clsx(
    'h-fit w-full rounded-xl overflow-hidden',
    classNames,
    shadowSize,
    paddingX,
    paddingY,
  );

  return <ListItem className={ItemClassName}>{children}</ListItem>;
};
