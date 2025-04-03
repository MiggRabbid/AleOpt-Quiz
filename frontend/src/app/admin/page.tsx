import { SideMain } from '@/components/layouts/SideMain/SideMain';
import { SideSecond } from '@/components/layouts/SideSecond/SideSecond';
import { Box } from '@mui/material';

export default function AdminPage() {
  return (
    <Box id="AdminPage" className="m-3.5 flex grow gap-3.5">
      <SideSecond>
        <Box>SideSecond</Box>
      </SideSecond>
      <SideMain>
        <Box>SadeMain</Box>
      </SideMain>
    </Box>
  );
}
