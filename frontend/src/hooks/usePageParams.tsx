'use client';
// Библиотеки
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
// Компоненты
import { routes, TRoutesValues } from '@/shared/config/routes';
// Типизация
import { UserRoles } from '@/types/staff.types';
import { useEffect } from 'react';

export const usePageParams = (page: string = '') => {
  const pathname = usePathname();

  const { data: session, status } = useSession();

  const is404Page = !Object.values(routes).includes(pathname as TRoutesValues);
  const isLoginPage = pathname === routes.login;
  const isAdminPage = pathname === routes.admin;
  const isNotUser = !session?.user;

  useEffect(() => {
    console.group('CHANGE session /', page !== '' ? `${page} /` : page, pathname);
    console.log(session);
    console.groupEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    console.group('CHANGE status /', page !== '' ? `${page} /` : page, pathname);
    console.log(status);
    console.groupEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const isModerator =
    session?.user.role === UserRoles.Admin || session?.user.role === UserRoles.Owner;

  return { is404Page, isLoginPage, isAdminPage, isModerator, isNotUser, session };
};
