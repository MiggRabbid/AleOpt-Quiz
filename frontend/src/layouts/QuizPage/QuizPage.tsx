// Библиотеки
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
// Логика
import { authOptions } from '@/shared/lib';
import { api } from '../../shared/api';
// Компоненты
import { SideMain } from '@/shared/ui/layouts/SideMain/SideMain';
import { SideSecond } from '@/shared/ui/layouts/SideSecond/SideSecond';
import { QuestionList } from './entities/QuestionList/QuestionList';
import { UserProfileForQuiz } from './entities/UserProfileForQuiz/UserProfileForQuiz';

const QuizPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });
  const questions = await api.getAllQuestions();

  return (
    <Box id="QuizPage" className="flex w-full gap-3.5 p-3.5">
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
          <QuestionList questions={questions ?? []} />
        </Box>
      </SideMain>
    </Box>
  );
};

export default QuizPage;
