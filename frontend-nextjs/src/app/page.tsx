import { SadeMain } from '@/components/layouts/SadeMain/SadeMain';
import { SideSecond } from '@/components/layouts/SideSecond/SideSecond';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box className="flex grow gap-3.5 m-3.5">
      <SideSecond>
        <Box>SideSecond</Box>
      </SideSecond>
      <SadeMain>
        <Box>SadeMain</Box>
      </SadeMain>
    </Box>
  );
}
