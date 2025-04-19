'use client';

import { Button, CircularProgress } from '@mui/material';

interface IBtmSmallProps {
  btnText: string;
  btnClick?: () => void;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'success' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
}

const BtmSmall = (props: IBtmSmallProps) => {
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
      className="h-10! min-h-10! rounded-xl!"
    >
      {isLoading && <CircularProgress sx={{ color: 'white !important' }} size={30} />}
      {!isLoading && btnText}
    </Button>
  );
};

export { BtmSmall };
