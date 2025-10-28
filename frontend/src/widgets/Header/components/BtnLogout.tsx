'use client';
// Библиотеки
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
// Логика
import { routes } from '@/shared/config/routes';
// Компоненты
import { BtnSmall } from '@/shared/ui/ui/btns';
import { CustomIcon } from '@/shared/ui/ui/CustomIcon';
import { usePageParams } from '@/hooks';

const BtnLogout = () => {
  const pathname = usePathname();
  const { isNotSession, isModerator, isLoginPage, is404Page, isAdminPage } =
    usePageParams();

  const [isLoading, setIsLoading] = useState(false);

  if (isNotSession || isLoginPage || is404Page) return null;

  const handelClickSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBtnText = () => {
    if (isLoading) {
      return 'Выхожу';
    } else {
      return 'Выход';
    }
  };

  return (
    <Box className="h-fir w-40">
      <BtnSmall
        btnText={getBtnText()}
        btnClick={handelClickSignOut}
        variant="text"
        fullWidth
        isLoading={isLoading}
        IconRight={!isLoading ? <CustomIcon name="Logout" /> : undefined}
      />
    </Box>
  );
};

const MemoizedBtnLogout = React.memo(BtnLogout);
export { MemoizedBtnLogout as BtnLogout };
