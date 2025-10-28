import * as Icons from '@mui/icons-material';

import { ICustomIconProps, TLibraryIconMUIName } from '.';

export const CustomIcon = ({ name, color, ...props }: ICustomIconProps) => {
  const IconMUI = Icons?.[name as TLibraryIconMUIName] ?? null;

  return (
    <>
      {IconMUI ? (
        <IconMUI
          color={color ?? 'inherit'}
          {...props}
          className="h-full! min-h-full! w-full! min-w-full!"
        />
      ) : null}
    </>
  );
};
