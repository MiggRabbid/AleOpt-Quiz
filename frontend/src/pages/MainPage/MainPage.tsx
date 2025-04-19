// Библиотеки
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
// Логика
import { authOptions } from '@/shared/lib/authOptions';
import { api } from '@/shared/components/api/api';
// Компоненты
import { SideMain } from '@/shared/components/layouts/SideMain/SideMain';
import { SideSecond } from '@/shared/components/layouts/SideSecond/SideSecond';
import { UserStats } from '@/entities/UserStats/UserStats';
import { UserProfile } from '@/entities/UserProfile/UserProfile';

const MainPage = async () => {
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

export default MainPage;
