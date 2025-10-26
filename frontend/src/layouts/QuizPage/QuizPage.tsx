// Библиотеки
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
// Логика
import { authOptions } from '@/shared/lib';
import { api } from '../../shared/api';
// Компоненты
import { SideMain, SideSecond, SideFull } from '@/shared/ui/layouts/';
import { QuestionList } from './entities/QuestionList';
import { UserProfileForQuiz } from './entities/UserProfileForQuiz';

const QuizPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });
  const questions = await api.getAllQuestions();

  return (
    <SideFull id="QuizPage" type="main">
      <SideSecond>
        <UserProfileForQuiz user={user} />
      </SideSecond>
      <SideMain>
        <Box
          className="w-full overflow-y-auto!"
          sx={{
            height: 'calc(100dvh - 91px - 14px - 14px - 20px - 20px)',
          }}
        >
          <QuestionList questions={questions?.slice(0, 6) ?? []} />
        </Box>
      </SideMain>
    </SideFull>
  );
};

export default QuizPage;
