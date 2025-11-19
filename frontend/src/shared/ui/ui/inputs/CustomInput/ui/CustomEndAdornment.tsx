import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import { ICustomEndAdornmentProps } from '../types/CustomInput';
import type { SxProps, Theme } from '@mui/material';

const CustomEndAdornment = (props: ICustomEndAdornmentProps) => {
  const { type, showPassword, setShowPassword, error, disabled } = props;

  if (type === 'text') return undefined;

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
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
