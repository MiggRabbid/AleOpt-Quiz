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
import { AdminProfile } from '@/entities/AdminProfile/AdminProfile';

const AdminPage = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });

  return (
    <Box id="AdminPage" className="m-3.5 flex grow gap-3.5">
      <SideSecond>
        <AdminProfile user={user} />
      </SideSecond>
      <SideMain>
        <Box>SadeMain</Box>
      </SideMain>
    </Box>
  );
};

export default AdminPage;
