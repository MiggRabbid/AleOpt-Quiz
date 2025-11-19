// Библиотеки
import { useSession } from 'next-auth/react';
// Логика
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
// Компоненты
import { PlugForEmptyData } from '@/shared/ui/ui/Plug/PlugForEmptyData';
import UsersListItem from './ui/UsersListItem';
// Типизация
import { iUser } from '@/types/staff.types';
import type { Session } from 'next-auth';

const UsersList = () => {
  const { data } = useSession();

  const currUser: Session['user'] = data?.user;

  const users = useAppSelector(getQuizStateField('users'));

  if (!users) {
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
};

export { UsersList };
