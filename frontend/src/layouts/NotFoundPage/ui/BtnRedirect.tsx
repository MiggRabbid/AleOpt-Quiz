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
import { CustomIcon } from '@/shared/ui/ui/CustomIcon';

export const BtnRedirect = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const isModerator =
    session?.user.role === UserRoles.Admin || session?.user.role === UserRoles.Owner;

  const handelClickBtn = () => {
    if (isModerator) {
      router.push(routes.admin);
    } else {
      router.push(routes.profile);
    }
  };

  return (
    <Box className="h-fit w-full">
      <BtnSmall
        btnText="На главную"
        btnClick={handelClickBtn}
        variant="text"
        fullWidth
        IconLeft={<CustomIcon name="Home" />}
      />
    </Box>
  );
};
