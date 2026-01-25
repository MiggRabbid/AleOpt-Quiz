// Библиотеки
import { memo } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// Логика
import { useGetCurrentUser, useGetUserStats } from '@/app/api/hooks';
import { useAuthContext } from '@/app/hooks';
// Компоненты
import { ProfileCard } from '@/features';
import { BtnStartQuiz, SummaryResults } from '@/entities/users/UserProfile/components';
// Типизация
import { UserRoles } from '@/app/types';

const UserProfile = () => {
  const { isAuth, user } = useAuthContext();

  const { data: userData } = useQuery({
    ...useGetCurrentUser({
      params: {
        username: user?.username ?? '',
      },
    }),
    enabled: isAuth && !!user?.username,
  });

  const { data: userStats } = useQuery({
    ...useGetUserStats({
      params: {
        username: user?.username ?? '',
      },
    }),
    enabled: isAuth && !!user?.username,
  });

  return (
    <Box className="flex h-full w-full flex-col justify-between gap-5.5" id="UserProfile">
      <Box className="flex h-fit w-full flex-col justify-start gap-3.5">
        <ProfileCard
          role={userData?.role || UserRoles.Employee}
          firstname={userData?.firstName || 'Нет данных'}
          lastname={userData?.lastName || ''}
          avatarAlt={userData?.username}
          avatarSrc={userData?.image}
        />
        <SummaryResults userStats={userStats || null} />
      </Box>
      <BtnStartQuiz />
    </Box>
  );
};

export default memo(UserProfile);
