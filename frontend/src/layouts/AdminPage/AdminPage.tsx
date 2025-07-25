// Библиотеки
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
// Логика
import { authOptions } from '@/shared/lib/authOptions';
import { api } from '@/shared/api/api';
// Компоненты
import { SideMain } from '@/shared/ui/layouts/SideMain/SideMain';
import { SideSecond } from '@/shared/ui/layouts/SideSecond/SideSecond';
import { AdminProfile } from '@/entities/AdminProfile';
import { AdminStats } from './features/AdminStats/AdminStats';

const AdminPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });

  const users = await api.getAllUsers();
  const questions = await api.getAllQuestions();
  const results = await api.getAllUsersStats();

  return (
    <Box id="AdminPage" className="m-3.5 flex grow gap-3.5">
      <SideSecond>
        <AdminProfile user={user} results={results} />
      </SideSecond>
      <SideMain>
        <AdminStats questions={questions} users={users} />
      </SideMain>
    </Box>
  );
};

export default AdminPage;
