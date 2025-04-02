import { SideMain } from '@/components/layouts/SideMain/SideMain';
import { SideSecond } from '@/components/layouts/SideSecond/SideSecond';
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';

const fetch = async () => {
  const session = await getServerSession();
  console.group(' ------------------------------Home page / session');
  console.log(session);
  console.groupEnd();
  return session;
};

export default function Home() {
  fetch();

  return (
    <Box id="main" className="flex grow gap-3.5 m-3.5">
      <SideSecond>
        <Box>SideSecond</Box>
      </SideSecond>
      <SideMain>
        <Box>SadeMain</Box>
      </SideMain>
    </Box>
  );
}
