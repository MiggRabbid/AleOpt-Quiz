// Библиотеки
import { Box } from '@mui/material';
// Компоненты
import { SummaryResults } from './features/SummaryResults';
import { BtnEndQuiz } from './features/BtnEndQuiz';
import { ProfileCard } from '@/features/ProfileCard';
// Типизация
import { iUser, UserRoles } from '@/types/staff.types';

interface IUserProfileForQuizProps {
  user: iUser | null;
}

const UserProfileForQuiz = (props: IUserProfileForQuizProps) => {
  const { user } = props;
  return (
    <Box
      className="flex h-full w-full flex-col justify-between gap-5.5 pt-2 pb-3.5"
      id="UserProfileForQuiz"
    >
      <Box className="flex h-fit w-full flex-col justify-start gap-3.5">
        <ProfileCard
          role={user?.role || UserRoles.Employee}
          firstname={user?.firstName || 'Нет данных'}
          lastname={user?.lastName || ''}
          avatarAlt={user?.username}
          avatarSrc={user?.image}
        />

        <SummaryResults />
      </Box>

      <BtnEndQuiz />
    </Box>
  );
};

export { UserProfileForQuiz };
