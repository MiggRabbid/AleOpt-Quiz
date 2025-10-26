'use client';
// Библиотеки
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
// Компоненты
import { routes } from '@/shared/config/routes';
import { BtnSmall } from '@/shared/ui/ui/btns';
// Типизация
import { UserRoles } from '@/types/staff.types';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export const BtnRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();
  
  const isLoginPage = pathname === routes.login;
  const isModerator =
    session?.user.role === UserRoles.Admin || session?.user.role === UserRoles.Owner;
  const isAdminPage = pathname === routes.admin;

  if (!isModerator || !session.user || isLoginPage) return null;

  const handelClickBtn = () => {
    if (isAdminPage) {
      router.push(routes.profile);
    } else {
      router.push(routes.admin);
    }
  };

  const getBtnText = () => {
    if (isAdminPage) {
      return 'На главную';
    } else {
      return 'В админку';
    }
  };

  return (
    <Box className="h-fir w-40">
      <BtnSmall
        btnText={getBtnText()}
        btnClick={handelClickBtn}
        variant="text"
        fullWidth
      />
    </Box>
  );
};
