import { Box } from '@mui/material';

const UserProfile = () => {
  return (
    <Box className="flex h-full w-full flex-col justify-between gap-5.5" id="UserProfile">
      {/* <UserProfileClientWrapper
        ProfileCard={
          <ProfileCard
            role={user?.role || UserRoles.Employee}
            firstname={user?.firstName || 'Нет данных'}
            lastname={user?.lastName || ''}
            avatarAlt={user?.username}
            avatarSrc={user?.image}
          />
        }
        SummaryResults={<SummaryResults userStats={userStats} />}
        BtnStartQuiz={<BtnStartQuiz />}
      /> */}
    </Box>
  );
};

export default UserProfile;
