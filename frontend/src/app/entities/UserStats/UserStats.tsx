import { Box, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';

const UserStats = async () => {
  const session = await getServerSession();
  return (
    <Box className="flex h-full w-full flex-col">
      <Box>
        <Box>
          <Typography>{session?.user.name}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { UserStats };
