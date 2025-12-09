// Библиотеки
import React from 'react';
import { Button } from '@mui/material';

const BtnLogo = () => {
  return (
    <Button onClick={() => {}}>
      <img
        src="/assets/images/logo.png"
        alt="АлёОпт"
        width={142}
        height={50}
        className="text-sm"
      />
    </Button>
  );
};

const MemoizedBtnLogout = React.memo(BtnLogo);
export { MemoizedBtnLogout as BtnLogo };
