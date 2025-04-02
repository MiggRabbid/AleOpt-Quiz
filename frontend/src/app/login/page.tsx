import { Box } from '@mui/material';

import { LoginForm } from './_components/LoginForm/LoginForm';
import { LoginImg } from './_components/LoginImg/LoginImg';
import { SideFull } from '@/components/layouts/SideFull/SideFull';

export default function Home() {
  return (
    <SideFull>
      <Box className="absolute top-0 left-0 flex h-full w-4/12 shrink grow items-center justify-center p-12">
        <LoginForm />
      </Box>
      <LoginImg />
    </SideFull>
  );
}
