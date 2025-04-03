'use client';

import { Button } from '@mui/material';

interface IBtmMainProps {
  btnText: string;
  btnClick?: () => void;
  fullWidth?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'success' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
}

const BtmMain = (props: IBtmMainProps) => {
  const {
    btnText,
    btnClick,
    fullWidth,
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
      {btnText}
    </Button>
  );
};

export { BtmMain };
