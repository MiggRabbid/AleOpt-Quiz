'use client';

import { Button, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';

const BtnLogout = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (!session?.user) return null;

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
      variant="outlined"
      color="success"
      className="h-10! min-h-10! rounded-xl!"
      onClick={handelClickSignOut}
      disabled={isLoading}
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
