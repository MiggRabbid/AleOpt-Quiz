// Библиотека
import { Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { getServerSession } from 'next-auth';
// Логика
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { api } from '@/app/api/api';
// Типизация

import type { Session } from 'next-auth';

const UserProfile = async () => {
  const session: Session | null = await getServerSession(authOptions);
  // console.log('----- UserProfile user -', session?.user);

  const user = await api.getUserStats({ username: session?.user.username || '' });
  console.log('---------------- curr user        -', user);

  return (
    <Box className="flex h-full w-full flex-col">
      <Box className="flex flex-row items-center justify-start gap-4">
        <Box className="align-center flex h-10 w-10 justify-center rounded-full bg-green-100 p-1">
          <ImageIcon color="success" className="h-full! w-full!" />
        </Box>
        <Typography component="h3" className="h-fit! text-xl! font-semibold!">
          {session?.user.name}
        </Typography>
      </Box>
    </Box>
  );
};

export { UserProfile };
