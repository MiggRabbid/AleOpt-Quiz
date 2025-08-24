'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { routes } from '@/shared/config/routes';
import { BtnSmall } from '@/shared/ui/ui/btns';

import { UserRoles } from '@/types/staff.types';

export const BtnRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  const isAdminOrOwner =
    session?.user.role === UserRoles.Admin || session?.user.role === UserRoles.Owner;
  const isAdminPage = pathname === routes.admin;

  if (!isAdminOrOwner) return null;

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

  return <BtnSmall btnText={getBtnText()} btnClick={handelClickBtn} variant="outlined" />;
};
