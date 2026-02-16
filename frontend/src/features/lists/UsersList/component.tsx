// Библиотеки
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
// Логика
import { useGetAllUsersStats } from '@/app/api/hooks';
import { useAuthContext } from '@/app/hooks';
// Компоненты
import { PlugForEmptyData } from '@/shared/ui';
import { UsersListItem } from './components';
// Типизация
import type { iUser } from '@app/types';

interface IUsersListProps {
  users?: iUser[];
}

const UsersList = ({ users }: IUsersListProps) => {
  const { isAuth, user: currUser } = useAuthContext();

  const { data: usersStats } = useQuery({
    ...useGetAllUsersStats(),
    enabled: isAuth && !!currUser?.username,
  });

  if (!users || users.length === 0) {
    return <PlugForEmptyData />;
  }

  return (
    <>
      {users.map((user: iUser, index: number) => {
        return (
          <UsersListItem
            key={`UsersListItem-${user.username}`}
            user={user}
            index={index + 1}
            currUser={currUser}
            usersStats={usersStats ?? []}
            activeUser={user.username === currUser?.username}
          />
        );
      })}
    </>
  );
};

const UsersListMemo = memo(UsersList);

export { UsersListMemo as UsersList };
