// Библиотеки
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
// Логика
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { api } from '@/app/api/api';
// Компоненты
import { SideMain } from '@/components/layouts/SideMain/SideMain';
import { SideSecond } from '@/components/layouts/SideSecond/SideSecond';
import { UserStats } from '../entities/UserStats/UserStats';
import { UserProfile } from '@/entities/UserProfile/UserProfile';

const Main = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });
  const userStats = await api.getUserStats({
    username: session?.user.username || '',
  });

  return (
    <Box id="MainPage" className="bg m-3.5 flex grow gap-3.5">
      <SideSecond>
        <UserProfile user={user} userStats={userStats} />
      </SideSecond>
      <SideMain>
        <UserStats userStats={userStats} />
      </SideMain>
    </Box>
  );
};

export default Main;
