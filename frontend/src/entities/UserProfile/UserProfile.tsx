// Компоненты
import { ProfileCard } from '@/features/ProfileCard';
import { BtnStartQuiz, SummaryResults } from './features';
// Типизация
import { iUserStats } from '@/types/stats.types';
import { iUser, UserRoles } from '@/types/staff.types';
import { UserProfileClientWrapper } from './UserProfileClientWrapper';

interface IUserProfileProps {
  user: iUser | null;
  userStats: iUserStats | null;
}

const UserProfile = (props: IUserProfileProps) => {
  const { user, userStats } = props;

  return (
    <div className="flex h-full w-full flex-col justify-between gap-5.5" id="UserProfile">
      <UserProfileClientWrapper
        ProfileCard={
          <ProfileCard
            role={user?.role || UserRoles.Employee}
            firstname={user?.firstName || 'Нет данных'}
            lastname={user?.lastName || ''}
            avatarAlt={user?.username}
            avatarSrc={user?.image}
          />
        }
        SummaryResults={<SummaryResults userStats={userStats} />}
        BtnStartQuiz={<BtnStartQuiz />}
      />
    </div>
  );
};

export default UserProfile;
