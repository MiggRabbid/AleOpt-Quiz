// Библиотеки
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
// Логика
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { api } from '../api/api';
// Компоненты
import { SideMain } from '@/components/layouts/SideMain/SideMain';
import { SideSecond } from '@/components/layouts/SideSecond/SideSecond';
import { QuestionList } from './entities/QuestionList/QuestionList';
import { UserProfileForQuiz } from './entities/UserProfileForQuiz/UserProfileForQuiz';

const QuizPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });
  const questions = await api.getAllQuestions();
  console.log('QuizPage questions        -', questions?.length);

  return (
    <Box id="QuizPage" className="m-3.5 flex grow gap-3.5">
      <SideSecond>
        <UserProfileForQuiz user={user} />
      </SideSecond>
      <SideMain>
        <Box
          className="h-full w-full overflow-y-auto!"
          sx={{
            height: 'calc(100dvh - 71px - 14px - 14px - 20px - 20px - 20px)',
          }}
        >
          <QuestionList questions={questions?.slice(0, 3) ?? []} />
        </Box>
      </SideMain>
    </Box>
  );
};

export default QuizPage;
