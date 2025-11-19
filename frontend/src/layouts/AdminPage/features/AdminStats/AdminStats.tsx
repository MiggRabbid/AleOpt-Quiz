// Типизация
import { IAdminStatsProps } from './AdminStats.types';
import AdminStatsClientWrapper from './AdminStatsClientWrapper';

const AdminStats = (props: IAdminStatsProps) => {
  return (
    <div id="AdminStats" className="h-full w-full p-2">
      <AdminStatsClientWrapper {...props} />
    </div>
  );
};

export { AdminStats };
