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
import { AdminProfile } from '@/entities/AdminProfile';
import { AdminStats } from './features/AdminStats/AdminStats';
import { SideFull } from '@/shared/ui/layouts/SideFull/SideFull';

const AdminPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });

  const users = await api.getAllUsers();
  const questions = await api.getAllQuestions();
  const results = await api.getAllUsersStats();

  return (
    <SideFull id="AdminPage">
      <SideSecond>
        <AdminProfile user={user} results={results} />
      </SideSecond>
      <SideMain>
        <AdminStats questions={questions} users={users} />
      </SideMain>
    </SideFull>
  );
};

export default AdminPage;
