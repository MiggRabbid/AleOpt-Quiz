// Библиотеки
import { Box } from '@mui/material';
// Компоненты
import { SummaryResults } from './features/SummaryResults';
import { ProfileHeader } from './features/ProfileHeader';
// Типизация
import { iUser, UserRoles } from '@/types/staff.types';
import { BtnEndQuiz } from './features/BtnEndQuiz';

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
      <ProfileHeader
        role={user?.role || UserRoles.Employee}
        firstname={user?.firstName || 'Нет данных'}
        lastname={user?.lastName || ''}
        avatarAlt={user?.username}
        avatarSrc={user?.image}
      />

      <SummaryResults />

      <BtnEndQuiz />
    </Box>
  );
};

export { UserProfileForQuiz };
