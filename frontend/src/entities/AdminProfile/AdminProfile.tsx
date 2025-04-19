'use client';
// Библиотеки
import { Box } from '@mui/material';
// Компоненты
import { ProfileHeader } from './ui/ProfileHeader';
// Типизация
import { iUser, UserRoles } from '@/types/staff';
import { iUserStats } from '@/types/stats';
import { SummaryResults } from './ui/SummaryResults/SummaryResults';
import { useEffect } from 'react';
import { useAppActions } from '@/hooks';

interface IAdminProfileProps {
  user: iUser | null;
  results: iUserStats[] | null;
}

const AdminProfile = (props: IAdminProfileProps) => {
  const { user, results } = props;
  const { setQuizStateField } = useAppActions();

  useEffect(() => {
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

export { AdminProfile };
