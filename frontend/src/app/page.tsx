import { SideMain } from '@/components/layouts/SideMain/SideMain';
import { SideSecond } from '@/components/layouts/SideSecond/SideSecond';
import { Box } from '@mui/material';
import { UserProfile } from './entities/UserProfile/UserProfile';
import { UserStats } from './entities/UserStats/UserStats';

export default function Home() {
  return (
    <Box id="main" className="bg m-3.5 flex grow gap-3.5">
      <SideSecond>
        <UserProfile />
      </SideSecond>
      <SideMain>
        <UserStats />
      </SideMain>
    </Box>
  );
}
