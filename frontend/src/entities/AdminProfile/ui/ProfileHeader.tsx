'use client';
// Библиотеки
import { useLayoutEffect } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
// Логика
import { useAppActions } from '@/hooks';
// Компоненты
import { UserAvatar } from '@/shared/ui/ui/UserAvatar/UserAvatar';
// Типизация
import { UserRoles, userRolesMap } from '@/types/staff.types';

interface ProfileHeader {
  role: UserRoles;
  firstname: string;
  lastname: string;
  avatarAlt?: string;
  avatarSrc?: string;
}

const ProfileHeader = (props: ProfileHeader) => {
  const { role, firstname, lastname, avatarAlt, avatarSrc } = props;

  const { clearCurrentResult, setQuizStateField } = useAppActions();
  useLayoutEffect(() => {
    clearCurrentResult();
    setQuizStateField({
      field: 'isStarted',
      data: false,
    });
    setQuizStateField({
      field: 'quizTimer',
      data: {
        seconds: '00',
        minutes: '00',
        currTime: 0,
        maxTime: 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="flex flex-row items-center justify-start gap-4 rounded-xl bg-white px-2 py-3">
      <UserAvatar src={avatarSrc} alt={avatarAlt} />
      <Box>
        {firstname ? (
          <Typography
            component="h4"
            className="h-fit! text-base! font-semibold! text-slate-500!"
          >
            {userRolesMap[role]}
          </Typography>
        ) : (
          <Skeleton variant="text" className="w-30! text-base!" />
        )}

        {firstname ? (
          <Typography component="h3" className="h-fit! text-2xl! font-semibold!">
            {firstname}
          </Typography>
        ) : (
          <Skeleton variant="text" className="w-30! text-4xl!" />
        )}

        {lastname ? (
          <Typography component="h3" className="h-fit! text-lg! font-semibold!">
            {lastname}
          </Typography>
        ) : (
          <Skeleton variant="text" className="w-30! text-2xl!" />
        )}
      </Box>
    </Box>
  );
};

export { ProfileHeader };
