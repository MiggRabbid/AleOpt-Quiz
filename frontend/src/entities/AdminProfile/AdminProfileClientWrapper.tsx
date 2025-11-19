'use client';
// Библиотеки
import React, { useLayoutEffect } from 'react';
// Логика
import { useAppActions } from '@/hooks';
// Компоненты
import { SummaryResults } from './ui';
// Типизация
import { UserRoles } from '@/types/staff.types';
import { ProfileCard } from '@/features/ProfileCard';
import { IAdminProfileProps } from './AdminProfile.types';

const AdminProfileClientWrapper = (props: IAdminProfileProps) => {
  const { user, results } = props;
  const { setQuizStateField } = useAppActions();

  useLayoutEffect(() => {
    if (!!results) {
      setQuizStateField({
        field: 'results',
        data: results,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  return (
    <>
      <ProfileCard
        role={user?.role || UserRoles.Employee}
        firstname={user?.firstName || 'Нет данных'}
        lastname={user?.lastName || ''}
        avatarAlt={user?.username}
        avatarSrc={user?.image}
      />

      <SummaryResults />
    </>
  );
};

export default React.memo(AdminProfileClientWrapper);
