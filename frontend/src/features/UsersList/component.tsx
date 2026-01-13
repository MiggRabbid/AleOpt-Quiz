// Библиотеки
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
// Логика
import { useAuthContext } from '@/app/hooks';
import { useGetAllUsers } from '@/app/api/hooks';
// Компоненты
import { PlugForEmptyData } from '@/shared/ui';
import { UsersListItem } from './components';
// Типизация
import type { iUser } from '@app/types';

interface IUsersListProps {
  users?: iUser[];
}

const UsersList = memo(({ users }: IUsersListProps) => {
  const { user: currUser } = useAuthContext();

  if (!users || users.length === 0) {
    return <PlugForEmptyData />;
  }

  return (
    <>
      {users.map((user: iUser, index: number) => {
        return (
          <UsersListItem
            key={`UsersListItem-${user.username}-${index}`}
            user={user}
            index={index + 1}
            activeUser={user.username === currUser?.username}
          />
        );
      })}
    </>
  );
});

export { UsersList };
