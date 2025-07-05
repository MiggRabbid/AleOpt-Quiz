import { IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { ICustomEndAdornmentProps } from '../types/CustomInput';
import type { SxProps, Theme } from '@mui/material';

const CustomEndAdornment = (props: ICustomEndAdornmentProps) => {
  const { type, showPassword, setShowPassword, error } = props;

  if (type === 'text') return undefined;

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const iconSx: SxProps<Theme> = {
    color: error ? 'oklch(50.5% 0.213 27.518)' : 'rgb(45, 125, 50)',
  };

  return (
    <InputAdornment position="end" className="pe-2">
      <IconButton
        aria-label={showPassword ? 'скрыть пароль' : 'display показать '}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
      >
        {showPassword ? <VisibilityOff sx={iconSx} /> : <Visibility sx={iconSx} />}
      </IconButton>
    </InputAdornment>
  );
};

export { CustomEndAdornment };
