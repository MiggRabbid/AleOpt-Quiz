// Библиотеки
import { useLayoutEffect } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
// Логика
import { useAppActions } from '@/app/hooks';
// Компоненты
import { UserAvatar } from '@/shared/ui';
// Типизация
import { userRolesMap, type UserRoles } from '@/app/types';

interface ProfileCard {
  role: UserRoles;
  firstname: string;
  lastname: string;
  avatarAlt?: string;
  avatarSrc?: string;
  isLoading?: boolean;
}

const ProfileCard = (props: ProfileCard) => {
  const { role, firstname, lastname, avatarAlt, avatarSrc, isLoading } = props;

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
    <Box className="flex flex-row items-center justify-start gap-4 rounded-2xl bg-slate-50 px-2 py-3 shadow-xl">
      {!isLoading ? (
        <UserAvatar src={avatarSrc} alt={avatarAlt} />
      ) : (
        <Skeleton variant="circular" className="h-20! w-20!" />
      )}
      <Box>
        {!isLoading ? (
          <Typography
            component="h4"
            className="h-fit! text-base! font-semibold! text-slate-500!"
          >
            {userRolesMap[role]}
          </Typography>
        ) : (
          <Skeleton variant="text" className="w-30! text-base!" />
        )}

        {!isLoading ? (
          <Typography component="h3" className="h-fit! text-2xl! font-semibold!">
            {firstname}
          </Typography>
        ) : (
          <Skeleton variant="text" className="w-30! text-4xl!" />
        )}

        {!isLoading ? (
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

export { ProfileCard };
