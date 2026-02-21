// Библиотеки
import { memo, useCallback, useMemo } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import clsx from 'clsx';
// Логика
import { useAppActions } from '@/app/hooks';
// Компоненты
import { UserStats } from '@/entities/users';
import { BtnGroupEdit, PlugForEmptyData } from '@/shared/ui';
// Типизация
import type { MouseEvent } from 'react';
import type { iResponseLogin, iUser, iUserStats } from '@/app/types';
import { TTypeModal, UserGender, UserRoles, UserStatus } from '@/app/types';
import { CustomAccordion } from '@/shared/ui/other/CustomAccordion';

interface IUsersListItemProps {
  user: iUser;
  index: number;
  activeUser: boolean;
  usersStats: iUserStats[];
  currUser: iResponseLogin | null;
}

const UsersListItem = ({
  user,
  index,
  activeUser,
  usersStats,
  currUser,
}: IUsersListItemProps) => {
  const { openUserEditor } = useAppActions();

  const currStats = useMemo(
    () => usersStats?.find((stat) => stat.username === user.username),
    [user.username, usersStats],
  );

  const handelClickOnEdit = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openUserEditor({
        type: TTypeModal.edit,
        editableUser: user,
      });
    },
    [openUserEditor, user],
  );

  const handelClickOnDelete = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openUserEditor({
        type: TTypeModal.delete,
        editableUser: user,
      });
    },
    [openUserEditor, user],
  );

  return (
    <CustomAccordion
      ariaControls={`UsersListItem-${user.username}`}
      SummaryChildren={
        <UsersListItemSummary index={index} user={user} activeUser={activeUser} />
      }
      DetailsChildren={
        <UsersListItemDetails
          user={user}
          currUser={currUser}
          currStats={currStats}
          handelClickOnEdit={handelClickOnEdit}
          handelClickOnDelete={handelClickOnDelete}
        />
      }
    />
  );
};

export default memo(UsersListItem);

const UsersListItemSummary = ({
  index,
  user,
  activeUser,
}: {
  index: number;
  user: iUser;
  activeUser: boolean;
}) => {
  const isEmployee = user.role === UserRoles.Employee;
  const isInactiveUser = user.status === UserStatus.Inactive;

  const attemptClass = clsx(
    'flex h-full! w-fit! items-center justify-center rounded-full! px-3! py-1! text-xs! leading-none! font-bold!',
    {
      'bg-slate-200! text-slate-600!': !!user?.numberAttempts && user?.numberAttempts > 0,
      'bg-slate-200! text-slate-300!':
        !user?.numberAttempts || user?.numberAttempts === 0,
    },
  );

  const resultClass = clsx(
    'flex h-full! w-fit! items-center justify-center rounded-full! px-3! py-1! text-xs! leading-none! font-bold!',
    {
      'bg-emerald-200! text-emerald-900!': !!user?.lastResult && user?.lastResult >= 66,
      'bg-rose-200! text-rose-900!': !!user?.lastResult && user?.lastResult <= 50,
      'bg-orange-200! text-orange-900!':
        !!user?.lastResult && user?.lastResult > 50 && user?.lastResult < 66,
      'bg-slate-200! text-slate-300!': !user?.lastResult,
    },
  );

  const usernameClass = clsx('me-2! font-bold!', { 'text-slate-400!': isInactiveUser });

  return (
    <Box className="flex grow-1 items-center">
      <Typography className="me-3! flex h-6! w-6! shrink-0! items-center justify-center rounded-full! bg-slate-500! text-xs! leading-none! font-bold! text-slate-50!">
        {index}
      </Typography>

      <Box className="me-3 flex w-full flex-row gap-1">
        <Box className="flex w-full flex-row gap-1">
          <Typography component="span" className={usernameClass}>
            {`${user.firstName} ${user.lastName}`}
          </Typography>

          {!isEmployee && <UserListItemBadge text={user.role} />}
          {activeUser && <UserListItemBadge text="это вы" />}
          {isInactiveUser && (
            <UserListItemBadge
              light={true}
              text={user.gender === UserGender.male ? 'уволен' : 'уволена'}
            />
          )}
        </Box>
        <Box className="flex w-fit shrink-0 flex-row gap-4">
          <Typography component="p" className={attemptClass}>
            Кол-во попыток:
            <Typography
              component="span"
              sx={{
                textAlign: 'center',
                marginLeft: '2px',
                width: '20px',
                fontWeight: 'inherit',
                fontSize: 'inherit',
              }}
            >
              {user?.numberAttempts ?? 0}
            </Typography>
          </Typography>
          <Typography component="p" className={resultClass}>
            Последний результат:
            <Typography
              component="span"
              sx={{
                textAlign: 'center',
                marginLeft: '2px',
                width: '20px',
                fontWeight: 'inherit',
                fontSize: 'inherit',
              }}
            >
              {user?.lastResult ?? '-'}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const UsersListItemDetails = ({
  user,
  currUser,
  currStats,
  handelClickOnDelete,
  handelClickOnEdit,
}: {
  user: iUser;
  currUser: iResponseLogin | null;
  currStats?: iUserStats;
  handelClickOnDelete: (e: MouseEvent) => void;
  handelClickOnEdit: (e: MouseEvent) => void;
}) => {
  const editingIsDisabled =
    user.username === currUser?.username ||
    user?.role === UserRoles.Owner ||
    currUser?.role === UserRoles.Employee ||
    user.status === UserStatus.Inactive;

  return (
    <Box className="">
      <Box className="mb-5 w-full!">
        <Box className="flex w-full! items-center justify-between py-2! ps-7! pe-0!">
          <Typography component="span" className="font-md font-semibold! text-slate-500!">
            Логин: {user.username}
          </Typography>
          <BtnGroupEdit
            onClickDelete={handelClickOnDelete}
            colorDelete="error"
            onClickEdit={handelClickOnEdit}
            colorEdit="success"
            size="small"
            withoutMargin
            disabled={editingIsDisabled}
          />
        </Box>
        <Divider />
      </Box>
      {!!currStats ? (
        <UserStats currentUser={currStats.username} />
      ) : (
        <PlugForEmptyData />
      )}
    </Box>
  );
};

const UserListItemBadge = ({ text, light }: { text: string; light?: boolean }) => {
  const usernameClass = clsx(
    'flex h-fit! w-fit! items-center justify-center rounded-full! bg-slate-200! px-2! py-1! text-xs! leading-none! font-bold! ',
    light ? 'text-slate-400!' : 'text-slate-600!',
  );
  return (
    <Typography component="span" className={usernameClass}>
      {text}
    </Typography>
  );
};
