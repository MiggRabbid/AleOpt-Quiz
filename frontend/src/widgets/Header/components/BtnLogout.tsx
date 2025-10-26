'use client';
// Библиотеки
import { Button, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { routes } from '@/shared/config/routes';
import { usePathname } from 'next/navigation';

const BtnLogout = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const isLoginPage = pathname === routes.login;

  if (!session?.user || isLoginPage) return null;

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

  return (
    <Button
      variant="text"
      color="success"
      className="order-0! h-10! min-h-10! w-40 rounded-xl! bg-white! leading-none! font-bold! shadow-xl! outline-0!"
      onClick={handelClickSignOut}
      disabled={isLoading}
      sx={{
        paddingX: '20px',
        paddingY: '5px',
      }}
    >
      {!isLoading && (
        <>
          <p>Выйти</p>
          <LogoutIcon color="success" className="ml-2 h-4! min-h-4! w-4! min-w-4!" />
        </>
      )}
      {isLoading && (
        <>
          <p>Выхожу</p>
          <CircularProgress
            color="success"
            className="ml-2 h-4! min-h-4! w-4! min-w-4!"
          />
        </>
      )}
    </Button>
  );
};

const MemoizedBtnLogout = React.memo(BtnLogout);
export { MemoizedBtnLogout as BtnLogout };
