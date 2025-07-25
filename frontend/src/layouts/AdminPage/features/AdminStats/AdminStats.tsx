'use client';
// Библиотеки
import { useLayoutEffect, useState } from 'react';
import { Box } from '@mui/material';
// Логика
import { useAppActions } from '@/hooks';
// Компоненты
import { Header } from './components/Header';
import { UsersList } from '../../entities/UsersList';
import { QuestionList } from '../../entities/QuestionList';
// Типизация
import { iUser } from '@/types/staff.types';
import { iQuestion } from '@/types/quiz.types';
import { TypeStatsTab } from '../../types/AdminStats';

interface IAdminStatsProps {
  users: iUser[] | null;
  questions: iQuestion[] | null;
}

const AdminStats = (props: IAdminStatsProps) => {
  const { users, questions } = props;

  const [activeTab, setActiveTab] = useState<TypeStatsTab>(TypeStatsTab.users);

  const { setQuizStateField } = useAppActions();

  useLayoutEffect(() => {
    if (!!users) {
      setQuizStateField({
        field: 'users',
        data: users,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useLayoutEffect(() => {
    if (!!questions) {
      setQuizStateField({
        field: 'questions',
        data: questions,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  return (
    <Box className="h-full w-full p-2" id="AdminStats">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <Box
        className="w-full! overflow-y-auto!"
        sx={{
          height: 'calc(100dvh - 91px - 14px - 14px - 20px - 40px - 20px - 20px - 16px)',
        }}
      >
        {activeTab === TypeStatsTab.users && <UsersList />}
        {activeTab === TypeStatsTab.questions && <QuestionList />}
      </Box>
    </Box>
  );
};

export { AdminStats };
