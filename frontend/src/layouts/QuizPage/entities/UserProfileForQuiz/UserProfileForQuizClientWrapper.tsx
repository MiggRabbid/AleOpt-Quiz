// Компоненты
import { ProfileCard } from '@/features/ProfileCard';
import { SummaryResults } from './features/SummaryResults';
import { BtnEndQuiz } from './features/BtnEndQuiz';
// Типизация
import { IUserProfileForQuizProps } from './UserProfileForQuiz.types';
import { UserRoles } from '@/types/staff.types';

const UserProfileForQuizClientWrapper = ({ user }: IUserProfileForQuizProps) => {
  return (
    <>
      <div className="flex h-fit w-full flex-col justify-start gap-3.5">
        <ProfileCard
          role={user?.role || UserRoles.Employee}
          firstname={user?.firstName || 'Нет данных'}
          lastname={user?.lastName || ''}
          avatarAlt={user?.username}
          avatarSrc={user?.image}
        />

        <SummaryResults />
      </div>
      <BtnEndQuiz />
    </>
  );
};

export default UserProfileForQuizClientWrapper;
