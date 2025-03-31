import { Box } from '@mui/material';

import { LoginForm } from './_components/LoginForm/LoginForm';
import { LoginImg } from './_components/LoginImg/LoginImg';

export default function Home() {
  return (
    <Box className="flex flex-row grow m-3.5 min-h-full  rounded-2xl shadow-block relative overflow-hidden bg-white">
      <Box className="w-4/12 h-full p-12 absolute left-0 top-0 grow shrink flex items-center justify-center">
        <LoginForm />
      </Box>
      <LoginImg />
    </Box>
  );
}
