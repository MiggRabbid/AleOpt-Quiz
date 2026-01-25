import { Box } from '@mui/material';

const LoginImg = () => {
  return (
    <Box
      className="shadow-glass border-glass relative col-span-2 max-h-[1080px]! w-full max-w-6xl! rounded-2xl border backdrop-blur-sm"
      style={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        className="bg-glass flex h-full w-full items-center justify-center"
        style={{
          height: '100%',
          backgroundImage: 'url("/assets/images/login-img.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </Box>
  );
};

export default LoginImg;
