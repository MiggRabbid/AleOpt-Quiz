// Библиотеки
import { memo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress } from '@mui/material';
// Логика
import { useAuthContext } from '@/app/hooks';
import { useGetAllQuestions, useGetAllUsers } from '@/app/api/hooks';
// Компоненты
import { UsersList, QuestionList } from '@/features';
import { Header } from './components';
// Типизация
import { TypeStatsTab } from './component.types';

const AdminStats = () => {
  const { isAuth, user } = useAuthContext();

  const [activeTab, setActiveTab] = useState<TypeStatsTab>(TypeStatsTab.users);

  const { data: users, isPending: usersIsPending } = useQuery({
    ...useGetAllUsers(),
    enabled: isAuth && !!user?.username,
  });

  const { data: questions, isPending: questionsIsPending } = useQuery({
    ...useGetAllQuestions(),
    enabled: isAuth && !!user?.username,
  });
  const isLoading = usersIsPending || questionsIsPending;

  return (
    <Box id="AdminStats" className="h-full w-full p-2">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <Box className="h-full w-full!">
        <Box className="mx-auto! flex h-full! w-full max-w-7xl flex-col gap-2 px-4!">
          {isLoading ? (
            <Box
              className="flex w-full grow flex-col items-center justify-center gap-10 rounded-2xl px-10 py-10"
              id="SummaryResultsForQuiz"
            >
              <CircularProgress color="success" size={40} />
            </Box>
          ) : activeTab === TypeStatsTab.users ? (
            <UsersList users={users} />
          ) : (
            activeTab === TypeStatsTab.questions && <QuestionList questions={questions} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
const AdminStatsMemo = memo(AdminStats);

export { AdminStatsMemo as AdminStats };
