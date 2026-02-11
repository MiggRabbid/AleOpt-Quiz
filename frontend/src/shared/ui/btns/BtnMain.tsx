// Библиотеки
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import type { ButtonProps } from '@mui/material/Button';

export interface IBtnMainProps {
  btnText: string;
  btnClick?: () => void;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'contained';
  color?: ButtonProps['color'];
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const BtnMain = (props: IBtnMainProps) => {
  const {
    btnText,
    btnClick,
    fullWidth,
    isLoading,
    disabled,
    variant = 'contained',
    color = 'primary',
    type = 'button',
  } = props;
  return (
    <Button
      onClick={btnClick}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      type={type}
      disabled={isLoading || disabled}
      className="shover:shadow-md! h-14! min-h-14! rounded-xl! px-5! py-1! leading-none! font-bold! shadow-sm! hover:shadow-md!"
      sx={{
        '&:hover': {
          backgroundColor: (theme) => {
            if (!color || color === 'inherit') return 'inherit';
            return theme.palette[color].main;
          },
        },
      }}
    >
      {isLoading && <CircularProgress sx={{ color: 'white !important' }} size={30} />}
      {!isLoading && btnText}
    </Button>
  );
};

export { BtnMain };
