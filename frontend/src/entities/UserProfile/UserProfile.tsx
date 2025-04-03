// Библиотеки
import { Box } from '@mui/material';
// Компоненты
import { SummaryResults } from './features/SummaryResults';
import { ProfileHeader } from './features/ProfileHeader';
import { BtmMain } from '@/components/ui/btns/BtnMain/BtmMain';
// Типизация
import { iUserStats } from '@/types/stats';
import { iUser, UserRoles } from '@/types/staff';
import { BtnStartQuiz } from './features/BtnStartQuiz';

interface IUserProfileProps {
  user: iUser | null;
  userStats: iUserStats | null;
}

const UserProfile = (props: IUserProfileProps) => {
  const { user, userStats } = props;
  return (
    <Box className="flex h-full w-full flex-col" id="UserProfile">
      <ProfileHeader
        role={user?.role || UserRoles.Employee}
        firstname={user?.firstName || 'Нет данных'}
        lastname={user?.lastName || ''}
        avatarAlt={user?.username}
        avatarSrc={user?.image}
      />
      <SummaryResults userStats={userStats} />
      <BtnStartQuiz />
    </Box>
  );
};

export { UserProfile };
