// Библиотеки
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
// Типизация
import type { ReactNode } from 'react';

interface IBtnSmallProps {
  btnText: string;
  btnClick?: () => void;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'success' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
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
    variant = 'text',
    color = 'success',
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
      className="shadow-none! h-10! min-h-10! rounded-xl! bg-white! leading-none! font-bold! outline-0! hover:shadow-md!"
      sx={{
        paddingX: '20px',
        paddingY: '5px',
      }}
      disabled={disabled || isLoading}
    >
      <Box className="flex items-center justify-center gap-2" color="inherit">
        {!!IconLeft && (
          <Box className="h-4! min-h-4! w-4! min-w-4!" color="inherit">
            {IconLeft}
          </Box>
        )}
        {btnText}
        {!isLoading && !!IconRight && (
          <Box className="h-4! min-h-4! w-4! min-w-4!" color="inherit">
            {IconRight}
          </Box>
        )}
        {isLoading && <CircularProgress sx={{ color: 'white !important' }} size={30} />}
      </Box>
    </Button>
  );
};

export { BtnSmall };
