import { Box, Skeleton, Typography } from '@mui/material';
import { UserAvatar } from '@/shared/ui/ui/UserAvatar/UserAvatar';
import { UserRoles, userRolesMap } from '@/types/staff';

interface ProfileHeader {
  role: UserRoles;
  firstname: string;
  lastname: string;
  avatarAlt?: string;
  avatarSrc?: string;
}

const ProfileHeader = (props: ProfileHeader) => {
  const { role, firstname, lastname, avatarAlt, avatarSrc } = props;
  return (
    <Box className="flex flex-row items-center justify-start gap-4">
      <UserAvatar src={avatarSrc} alt={avatarAlt} />
      <Box>
        {firstname ? (
          <Typography
            component="h4"
            className="h-fit! text-base! font-semibold! text-slate-500!"
          >
            {userRolesMap[role]}
          </Typography>
        ) : (
          <Skeleton variant="text" className="w-30! text-base!" />
        )}

        {firstname ? (
          <Typography component="h3" className="h-fit! text-2xl! font-semibold!">
            {firstname}
          </Typography>
        ) : (
          <Skeleton variant="text" className="w-30! text-4xl!" />
        )}

        {lastname ? (
          <Typography component="h3" className="h-fit! text-lg! font-semibold!">
            {lastname}
          </Typography>
        ) : (
          <Skeleton variant="text" className="w-30! text-2xl!" />
        )}
      </Box>
    </Box>
  );
};

export { ProfileHeader };
