'use client';
// Библиотеки
import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
// Компоненты
import { routes } from '@/app/_config/routes';

const BtnLogo = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handelClick = () => {
    if (pathname !== routes.main) {
      router.push(routes.main);
    }
  };

  return (
    <Button
      onClick={handelClick}
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
        draggable={false}
        className="pointer-events-none! select-none!"
      />
    </Button>
  );
};

const MemoizedBtnLogo = React.memo(BtnLogo);
export { MemoizedBtnLogo as BtnLogo };
