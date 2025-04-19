'use client';

import { routes } from '@/shared/config/routes';
import { BtmSmall } from '@/shared/ui/ui/btns/BtnSmall';
import { useRouter, usePathname } from 'next/navigation';

interface IBtnRedirectProps {
  isAdminOrOwner: boolean;
}

export const BtnRedirect = ({ isAdminOrOwner }: IBtnRedirectProps) => {
  const router = useRouter();
  const pathname = usePathname();

  if (!isAdminOrOwner) return null;

  const handelClickBtn = () => {
    if (pathname === routes.admin) {
      router.push(routes.main);
    }

    router.push(routes.admin);
  };

  const getBtnText = () => {
    if (pathname === routes.admin) {
      return 'На главную';
    }
    return 'В админку';
  };

  return <BtmSmall btnText={getBtnText()} btnClick={handelClickBtn} variant="outlined" />;
};
