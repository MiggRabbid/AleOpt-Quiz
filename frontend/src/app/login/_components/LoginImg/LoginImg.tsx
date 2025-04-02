import { Box } from '@mui/material';
import Image from 'next/image';

const LoginImg = () => {
  return (
    <Box className="absolute top-0 right-0 min-h-full w-8/12!">
      <Image
        className="object-cover"
        src="/assets/images/login-img.jpg"
        alt="АлёОпт Квиз"
        fill
        loading="lazy"
      />
      <Box className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent" />
    </Box>
  );
};

export { LoginImg };
