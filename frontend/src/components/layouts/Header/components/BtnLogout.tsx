'use client';

import { Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

const BtnLogout = () => {
  const { data: session } = useSession();

  if (!session?.user) return null;
  return (
    <Button variant="outlined" color="success" onClick={() => signOut()}>
      Выйти
    </Button>
  );
};

export { BtnLogout };
