// Библиотеки
import React from 'react';
import { Box } from '@mui/material';
// Компоненты
import { ProfileCard } from '@/features/ProfileCard';
import { BtnStartQuiz, SummaryResults } from './features';
// Типизация
import { iUserStats } from '@/types/stats.types';
import { iUser, UserRoles } from '@/types/staff.types';

interface IUserProfileProps {
  user: iUser | null;
  userStats: iUserStats | null;
}

const UserProfile = (props: IUserProfileProps) => {
  const { user, userStats } = props;

  return (
    <Box
      className="flex h-full w-full flex-col justify-between gap-5.5 pt-2 pb-3.5"
      id="UserProfile"
    >
      <Box className="flex h-fit w-full flex-col justify-start gap-3.5">
        <ProfileCard
          role={user?.role || UserRoles.Employee}
          firstname={user?.firstName || 'Нет данных'}
          lastname={user?.lastName || ''}
          avatarAlt={user?.username}
          avatarSrc={user?.image}
        />

        <SummaryResults userStats={userStats} />
      </Box>

      <BtnStartQuiz />
    </Box>
  );
};

export default React.memo(UserProfile);
