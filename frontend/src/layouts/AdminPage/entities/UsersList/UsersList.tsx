import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { PlugForEmptyData } from '@/shared/ui/ui/other/PlugForEmptyData';
import { Box } from '@mui/material';
import { UsersListItem } from './ui/UsersListItem';
import { iUser } from '@/types/staff';

const UsersList = () => {
  const users = useAppSelector(getQuizStateField('users'));

  if (!users) {
    return <PlugForEmptyData />;
  }

  return (
    <Box className="mx-auto! flex h-full! w-full max-w-5xl flex-col gap-2 px-4!">
      {users.map((user: iUser, index: number) => {
        return (
          <UsersListItem
            key={`UsersListItem-${user.username}-${index}`}
            user={user}
            index={index + 1}
          />
        );
      })}
    </Box>
  );
};

export { UsersList };
