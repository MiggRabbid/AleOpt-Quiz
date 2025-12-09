// Библиотеки
import React, { useState } from 'react';
import { Box } from '@mui/material';
// Компоненты
import { BtnSmall } from '@/shared/ui/btns';
import { CustomIcon } from '@/shared/ui/CustomIcon';
// import { usePageParams } from '@/hooks';

const BtnLogout = () => {
  // const { isNotUser, isLoginPage, is404Page } = usePageParams();

  const [isLoading, setIsLoading] = useState(false);

  // if (isNotUser || isLoginPage || is404Page) return null;

  const handelClickSignOut = async () => {
    setIsLoading(true);
    try {
      // await signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBtnText = () => (isLoading ? 'Выхожу' : 'Выход');

  return (
    <Box className="h-fir w-40">
      <BtnSmall
        btnText={getBtnText()}
        btnClick={handelClickSignOut}
        variant="text"
        fullWidth
        isLoading={isLoading}
        IconRight={<CustomIcon name="Logout" />}
      />
    </Box>
  );
};

const MemoizedBtnLogout = React.memo(BtnLogout);
export { MemoizedBtnLogout as BtnLogout };
