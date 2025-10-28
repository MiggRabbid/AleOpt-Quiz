'use client';
// Библиотеки
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
// Компоненты
import { routes } from '@/shared/config/routes';
// Типизация
import { UserRoles } from '@/types/staff.types';

export const usePageParams = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const is404Page = !Object.values(routes).includes(pathname);
  const isLoginPage = pathname === routes.login;
  const isAdminPage = pathname === routes.admin;
  const isNotSession = !session || !session?.user;

  const isModerator =
    session?.user.role === UserRoles.Admin || session?.user.role === UserRoles.Owner;

  return { is404Page, isLoginPage, isAdminPage, isModerator, isNotSession, session };
};
