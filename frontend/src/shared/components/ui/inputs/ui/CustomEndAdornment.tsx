import { IconButton, InputAdornment } from '@mui/material';
import { ICustomEndAdornmentProps } from '../types/CustomInput';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const CustomEndAdornment = (props: ICustomEndAdornmentProps) => {
  const { type, showPassword, setShowPassword } = props;

  if (type === 'text') return undefined;

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <InputAdornment position="end">
      <IconButton
        aria-label={showPassword ? 'скрыть пароль' : 'display показать '}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
      >
        {showPassword ? (
          <VisibilityOff
            sx={{
              color: 'rgb(45, 125, 50)',
            }}
          />
        ) : (
          <Visibility
            sx={{
              color: 'rgb(45, 125, 50)',
            }}
          />
        )}
      </IconButton>
    </InputAdornment>
  );
};

export { CustomEndAdornment };
