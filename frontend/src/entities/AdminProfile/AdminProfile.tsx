// Библиотеки
import { Box } from '@mui/material';
// Компоненты
import { ProfileHeader } from './features/ProfileHeader';
// Типизация
import { iUser, UserRoles } from '@/types/staff';

interface IAdminProfileProps {
  user: iUser | null;
}

const AdminProfile = (props: IAdminProfileProps) => {
  const { user } = props;
  return (
    <Box
      className="flex h-full w-full flex-col justify-between gap-5.5 pt-2 pb-3.5"
      id="AdminProfile"
    >
      <ProfileHeader
        role={user?.role || UserRoles.Employee}
        firstname={user?.firstName || 'Нет данных'}
        lastname={user?.lastName || ''}
        avatarAlt={user?.username}
        avatarSrc={user?.image}
      />
    </Box>
  );
};

export { AdminProfile };
