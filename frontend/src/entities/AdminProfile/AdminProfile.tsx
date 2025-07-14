'use client';
// Библиотеки
import React, { useLayoutEffect } from 'react';
import { Box } from '@mui/material';
// Логика
import { useAppActions } from '@/hooks';
// Компоненты
import { ProfileHeader } from './ui/ProfileHeader';
import { SummaryResults } from './ui/SummaryResults/SummaryResults';
// Типизация
import { iUser, UserRoles } from '@/types/staff.types';
import { iUserStats } from '@/types/stats.types';

interface IAdminProfileProps {
  user: iUser | null;
  results: iUserStats[] | null;
}

const AdminProfile = (props: IAdminProfileProps) => {
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
    <Box
      className="flex h-full w-full flex-col justify-start gap-5.5 pt-2 pb-3.5"
      id="AdminProfile"
    >
      <ProfileHeader
        role={user?.role || UserRoles.Employee}
        firstname={user?.firstName || 'Нет данных'}
        lastname={user?.lastName || ''}
        avatarAlt={user?.username}
        avatarSrc={user?.image}
      />

      <SummaryResults />
    </Box>
  );
};

export default React.memo(AdminProfile);
