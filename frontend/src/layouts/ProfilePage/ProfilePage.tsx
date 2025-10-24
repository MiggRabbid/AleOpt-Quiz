// Библиотеки
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
// Логика
import { authOptions } from '@/shared/lib';
import { api } from '@/shared/api';
// Компоненты
import { SideMain } from '@/shared/ui/layouts/SideMain/SideMain';
import { SideSecond } from '@/shared/ui/layouts/SideSecond/SideSecond';
import { UserProfile } from '@/entities/UserProfile';
import { UserStats } from '@/entities/UserStats';
import { SideFull } from '@/shared/ui/layouts/SideFull/SideFull';

const ProfilePage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });

  const userStats = await api.getUserStats({
    username: session?.user.username || '',
  });

  return (
    <SideFull id="ProfilePage">
      <SideSecond>
        <UserProfile user={user} userStats={userStats} />
      </SideSecond>
      <SideMain>
        <UserStats userStats={userStats} />
      </SideMain>
    </SideFull>
  );
};

export default ProfilePage;
