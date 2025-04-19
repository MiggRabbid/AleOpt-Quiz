import { Box } from '@mui/material';

import { LoginForm } from './ui/LoginForm/LoginForm';
import { LoginImg } from './ui/LoginImg/LoginImg';
import { SideFull } from '@/shared/ui/layouts/SideFull/SideFull';

export default function LoginPage() {
  return (
    <SideFull>
      <Box
        className="absolute top-0 left-0 flex h-full w-4/12 shrink grow items-center justify-center p-12"
        id="LoginPage"
      >
        <LoginForm />
      </Box>
      <LoginImg />
    </SideFull>
  );
}
