// Библиотеки
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
// Логика
import { authOptions } from '@/shared/lib';
import { api } from '../../shared/api';
// Компоненты
import { SideMain, SideSecond, SideFull } from '@/shared/ui/layouts/';
import { UserProfileForQuiz } from './entities/UserProfileForQuiz';
import QuestionList from './entities/QuestionList/QuestionList';

const QuizPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  const user = await api.getCurrentUser({
    username: session?.user.username || '',
  });
  const questions = await api.getAllQuestions();

  return (
    <SideFull id="QuizPage">
      <SideSecond>
        <UserProfileForQuiz user={user} />
      </SideSecond>
      <SideMain
        style={{
          height: 'calc(100dvh - 8px - 60px - 18px - 18px - 1px)',
        }}
      >
        <QuestionList questions={questions ?? []} />
      </SideMain>
    </SideFull>
  );
};

export default QuizPage;
