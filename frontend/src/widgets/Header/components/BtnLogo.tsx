'use client';
// Библиотеки
import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
// Компоненты
import { routes } from '@/shared/config/routes';
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';

const BtnLogo = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isStarted = useAppSelector(getQuizStateField('isStarted'));

  const handelClick = () => {
    if (pathname !== routes.profile) {
      router.push(routes.profile);
    }
  };

  return (
    <Button
      onClick={handelClick}
      disabled={isStarted}
      variant="outlined"
      sx={{
        height: '60px',
        padding: 0,
        outline: 'none !important',
        border: 'none !important',
        backgroundColor: 'transparent !important',
        '&:hover': {
          outline: 'none !important',
          border: 'none !important',
          backgroundColor: 'transparent !important',
        },
        '&:Mui-disabled': {
          outline: 'none !important',
          border: 'none !important',
          backgroundColor: 'transparent !important',
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
