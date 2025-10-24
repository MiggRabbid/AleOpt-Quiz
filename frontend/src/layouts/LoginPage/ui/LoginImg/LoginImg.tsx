import { Box } from '@mui/material';
import Image from 'next/image';

const LoginImg = () => {
  return (
    <Box
      className="shadow-glass border-glass relative col-span-2 h-full min-h-full overflow-hidden rounded-2xl border backdrop-blur-sm"
      sx={{
        height: '100%',
      }}
    >
      <Box className="bg-glass flex h-full w-full items-center justify-center">
        <Box className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            className="object-cover"
            src="/assets/images/login-img.jpg"
            alt="АлёОпт Квиз"
            fill
            loading="lazy"
          />
        </Box>
      </Box>
    </Box>
  );
};

export { LoginImg };
