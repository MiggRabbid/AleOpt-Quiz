// Библиотеки
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
// Типизация
import type { ReactNode } from 'react';
import type { ButtonProps } from '@mui/material/Button';

interface IBtnSmallProps {
  btnText: string;
  btnClick?: () => void;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'contained';
  color?: ButtonProps['color'];
  IconRight?: ReactNode;
  IconLeft?: ReactNode;
  disabled?: boolean;
}

const BtnSmall = (props: IBtnSmallProps) => {
  const {
    btnText,
    btnClick,
    fullWidth,
    isLoading,
    variant = 'contained',
    color = 'primary',
    IconRight,
    IconLeft,
    disabled,
  } = props;
  return (
    <Button
      onClick={btnClick}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      className="h-10! min-h-10! rounded-xl! px-5! py-1! leading-none! font-bold! shadow-none! hover:shadow-md!"
      sx={{
        '&:hover': {
          backgroundColor: (theme) => {
            if (!color || color === 'inherit') return 'inherit';
            return theme.palette[color].main;
          },
        },
      }}
      disabled={disabled || isLoading}
      startIcon={
        !!IconLeft && (
          <Box
            className="flex h-full! min-h-full! w-4! min-w-4! items-center justify-center"
            color="inherit"
          >
            {IconLeft}
          </Box>
        )
      }
      endIcon={
        !isLoading &&
        !!IconRight && (
          <Box
            className="flex h-full! min-h-full! w-4! min-w-4! items-center justify-center"
            color="inherit"
          >
            {IconRight}
          </Box>
        )
      }
    >
      <Box className="flex items-center justify-center gap-2" color="inherit">
        {btnText}

        {isLoading && <CircularProgress sx={{ color: 'white !important' }} size={20} />}
      </Box>
    </Button>
  );
};

export { BtnSmall };
