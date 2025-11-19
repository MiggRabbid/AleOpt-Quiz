// Компоненты
import UserStatsClientWrapper from './UserStatsClientWrapper';
// Типизация
import { IUserStatsProps } from './UserStats.types';

const UserStats = (props: IUserStatsProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-8" id="UserStats">
      <UserStatsClientWrapper {...props} />
    </div>
  );
};

export default UserStats;
