'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useAppActions, useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';

import { UserStats } from '@/entities/UserStats';
import { PlugForEmptyData } from '@/shared/ui/ui/other/PlugForEmptyData';

import { iUser, UserRoles } from '@/types/staff.types';
import React, { useCallback, useState } from 'react';
import { TTypeModal } from '@/types/modal.types';
import { BtnGroupEdit } from '@/shared/ui/ui/btns';

interface IUsersListItemProps {
  user: iUser;
  index: number;
  activeUser: boolean;
}

const UsersListItem = ({ user, index, activeUser }: IUsersListItemProps) => {
  const { openUserEditor } = useAppActions();

  const usersStats = useAppSelector(getQuizStateField('results'));
  const currStats = usersStats?.find((stat) => stat.username === user.username);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, expanded: boolean) => setIsExpanded(expanded),
    [],
  );

  const handelClickOnEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openUserEditor({
      type: TTypeModal.editUser,
      editableUser: user,
    });
  };

  const handelClickOnDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openUserEditor({
      type: TTypeModal.deleteUser,
      editableUser: user,
    });
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleChange}
      className="rounded-md! border-2! border-green-200! bg-green-50!"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`UsersListItem-${user}`}
        id={`UsersListItem-${user}`}
        className="flex w-full! justify-between bg-green-100!"
      >
        <Box className="flex grow-1 items-center">
          <Typography className="me-2! flex h-6! w-6! items-center justify-center rounded-full! bg-green-300! text-xs! leading-none! font-bold! text-slate-800!">
            {index}
          </Typography>

          <Box className="flex w-full flex-col gap-1">
            <Box className="flex w-full flex-row gap-1">
              <Typography component="span" className="me-2!">
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              {user.role !== UserRoles.Employee && (
                <Typography className="flex h-fit! w-fit! items-center justify-center rounded-full! bg-green-200! px-2! py-1! text-xs! leading-none! font-bold! text-green-600!">
                  {user.role}
                </Typography>
              )}
              {activeUser && (
                <Typography
                  component="span"
                  className="flex h-fit! w-fit! items-center justify-center rounded-full! bg-green-200! px-2! py-1! text-xs! leading-none! font-bold! text-green-600!"
                >
                  это вы
                </Typography>
              )}
            </Box>
            {isExpanded && (
              <Typography
                component="span"
                className="text-sm! font-semibold! text-slate-500!"
              >
                Логин: {user.username}
              </Typography>
            )}
          </Box>
        </Box>

        {!activeUser && isExpanded && (
          <BtnGroupEdit
            onClickDelete={handelClickOnDelete}
            colorDelete="error"
            onClickEdit={handelClickOnEdit}
            colorEdit="success"
            size="small"
          />
        )}
      </AccordionSummary>
      <AccordionDetails className="w-full!">
        {!!currStats ? <UserStats userStats={currStats} /> : <PlugForEmptyData />}
      </AccordionDetails>
    </Accordion>
  );
};

export default React.memo(UsersListItem);
