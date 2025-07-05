'use client';

import { Button, CircularProgress } from '@mui/material';

interface IBtnMainProps {
  btnText: string;
  btnClick?: () => void;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'success' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
}

const BtnMain = (props: IBtnMainProps) => {
  const {
    btnText,
    btnClick,
    fullWidth,
    isLoading,
    variant = 'contained',
    color = 'success',
  } = props;
  return (
    <Button
      onClick={btnClick}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      className="h-14! min-h-14! rounded-xl!"
    >
      {isLoading && <CircularProgress sx={{ color: 'white !important' }} size={30} />}
      {!isLoading && btnText}
    </Button>
  );
};

export { BtnMain };
