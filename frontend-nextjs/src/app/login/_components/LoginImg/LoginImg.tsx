import { Box } from '@mui/material';
import Image from 'next/image';

const LoginImg = () => {
  return (
    <Box className="min-h-full absolute w-8/12! top-0 right-0">
      <Image
        className="object-cover"
        src="/assets/images/login-img.jpg"
        alt="АлёОпт Квиз"
        fill
        loading="lazy"
      />
      <Box className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-white to-transparent" />
    </Box>
  );
};

export { LoginImg };
