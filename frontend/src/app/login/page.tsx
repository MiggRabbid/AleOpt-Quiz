import { Box } from '@mui/material';

import { LoginForm } from './_components/LoginForm/LoginForm';
import { LoginImg } from './_components/LoginImg/LoginImg';
import { SideFull } from '@/components/layouts/SideFull/SideFull';

export default function Home() {
  return (
    <SideFull>
      <Box className="w-4/12 h-full p-12 absolute left-0 top-0 grow shrink flex items-center justify-center">
        <LoginForm />
      </Box>
      <LoginImg />
    </SideFull>
  );
}
