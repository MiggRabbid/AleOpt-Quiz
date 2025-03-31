'use client';

import { Button } from '@mui/material';
import Image from 'next/image';

const BtnLogo = () => {
  return (
    <Button
      onClick={() => {}}
      variant="outlined"
      sx={{
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          outline: 'none',
          border: 'none',
          backgroundColor: 'transparent',
        },
        '.MuiTouchRipple-root': {
          display: 'none',
        },
      }}
    >
      <Image
        src="/assets/images/logo.png"
        alt="АлёОпт - лучший магазин аксессуаров"
        width={142}
        height={50}
      />
    </Button>
  );
};

export { BtnLogo };
