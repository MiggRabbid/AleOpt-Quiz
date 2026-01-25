// Библиотеки
import { memo } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// Логика
import { useGetCurrentUser } from '@app/api/hooks';
import { useAuthContext } from '@app/hooks';
// Компоненты
import { ProfileCard } from '@/features';
import { BtnEndQuiz, SummaryResults } from './components';
// Типизация
import { UserRoles } from '@app/types';

const UserProfileForQuiz = () => {
  const { isAuth, user } = useAuthContext();

  const {
    data: userData,
    isLoading,
    isPending,
  } = useQuery({
    ...useGetCurrentUser({
      params: {
        username: user?.username ?? '',
      },
    }),
    enabled: isAuth && !!user?.username,
  });

  return (
    <Box className="flex h-full w-full flex-col justify-start gap-5.5">
      <Box className="flex h-fit w-full flex-col justify-start gap-3.5">
        <ProfileCard
          role={userData?.role || UserRoles.Employee}
          firstname={userData?.firstName || 'Нет данных'}
          lastname={userData?.lastName || ''}
          avatarAlt={userData?.username}
          avatarSrc={userData?.image}
          isLoading={isLoading || isPending}
        />

        <SummaryResults />
      </Box>

      <BtnEndQuiz />
    </Box>
  );
};

export default memo(UserProfileForQuiz);
