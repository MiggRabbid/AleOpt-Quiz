'use client';

import { Box, Button, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

interface IBtnSmallProps {
  btnText: string;
  btnClick?: () => void;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'success' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
  IconRight?: ReactNode;
  IconLeft?: ReactNode;
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
  } = props;
  return (
    <Button
      onClick={btnClick}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      className="h-10! min-h-10! rounded-xl! bg-white! leading-none! font-bold! shadow-xl! outline-0!"
      sx={{
        paddingX: '20px',
        paddingY: '5px',
      }}
    >
      <Box className="flex items-center justify-center gap-2" color="inherit">
        {isLoading && <CircularProgress sx={{ color: 'white !important' }} size={30} />}
        {!isLoading && !!IconLeft && (
          <Box className="h-4! min-h-4! w-4! min-w-4!" color="inherit">
            {IconLeft}
          </Box>
        )}
        {!isLoading && btnText}
        {!isLoading && !!IconRight && (
          <Box className="h-4! min-h-4! w-4! min-w-4!" color="inherit">
            {IconRight}
          </Box>
        )}
      </Box>
    </Button>
  );
};

export { BtnSmall };
