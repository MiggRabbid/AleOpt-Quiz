// Библиотеки
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// Логика
import { useGetCurrentUser, useGetUserStats } from '@/app/api/hooks';
import { useAuthContext } from '@/app/hooks';
// Компоненты
import { ProfileCard } from '@/features/ProfileCard';
import { UserRoles } from '@/app/types';
import { useEffect } from 'react';
import { BtnStartQuiz, SummaryResults } from './components';

const UserProfile = () => {
  const { isAuth, user } = useAuthContext();

  const { data: userData } = useQuery({
    ...useGetCurrentUser({
      query: {
        username: user?.username ?? '',
      },
    }),
    enabled: isAuth,
  });

  const { data: userStats } = useQuery({
    ...useGetUserStats({
      query: {
        username: user?.username ?? '',
      },
    }),
    enabled: isAuth,
  });

  useEffect(() => {
    console.group('userData');
    console.log(userData);
    console.groupEnd();
  }, [userData]);

  useEffect(() => {
    console.group('userStats');
    console.log(userStats);
    console.groupEnd();
  }, [userStats]);

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

export default UserProfile;
