'use client';
// Библиотеки
import { useEffect } from 'react';
import { Box } from '@mui/material';
// Логика
import { useAppActions } from '@/hooks';
// Компоненты
// Типизация
import { iUser } from '@/types/staff';
import { iQuestion } from '@/types/quiz';

interface IAdminStatsProps {
  users: iUser[] | null;
  questions: iQuestion[] | null;
}

const AdminStats = (props: IAdminStatsProps) => {
  const { users, questions } = props;

  const { setQuizStateField } = useAppActions();

  useEffect(() => {
    if (!!users) {
      setQuizStateField({
        field: 'users',
        data: users,
      });
    }
  }, [users]);

  useEffect(() => {
    if (!!questions) {
      setQuizStateField({
        field: 'questions',
        data: questions,
      });
    }
  }, [questions]);

  return (
    <Box className="flex h-full w-full flex-col gap-10 p-2" id="AdminStats">
      <Box className="flex w-full grow gap-10"></Box>
      <Box className="flex h-fit shrink-1 grow-0 gap-10">
        <Box className="h-fit w-fit shrink-0 grow-0"></Box>
        <Box className="h-fit grow"></Box>
      </Box>
    </Box>
  );
};

export { AdminStats };
