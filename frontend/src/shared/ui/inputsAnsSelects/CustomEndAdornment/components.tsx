import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import type { SxProps, Theme } from '@mui/material';
import type { ICustomEndAdornmentProps } from './types';
import type { MouseEvent } from 'react';

const CustomEndAdornment = <T extends string>(props: ICustomEndAdornmentProps<T>) => {
  const { type, showPassword, setShowPassword, error, disabled } = props;

  if (type !== 'password') return null;

  const handleClickShowPassword = () =>
    setShowPassword((prev: typeof showPassword) => !prev);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const iconSx: SxProps<Theme> = {
    color: disabled
      ? 'rgba(0, 0, 0, 0.38) !important'
      : error
        ? 'oklch(50.5% 0.213 27.518) !important'
        : 'oklch(27.9% 0.041 260.031) !important',
  };

  return (
    <InputAdornment position="end" className="pe-2">
      <IconButton
        aria-label={showPassword ? 'скрыть пароль' : 'display показать '}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
        disabled={disabled}
      >
        {showPassword ? <VisibilityOff sx={iconSx} /> : <Visibility sx={iconSx} />}
      </IconButton>
    </InputAdornment>
  );
};

export { CustomEndAdornment };
