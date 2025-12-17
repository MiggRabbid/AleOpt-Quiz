// Библиотеки
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
// Логика
import { useGetAllQuestions } from '@/app/api/hooks';
import { useAppActions, useAuthContext } from '@/app/hooks';
import { UserProfileForQuiz } from '@/entities/quiz';
// Компоненты
import { SideFull, SideMain, SideSecond } from '@/shared/layouts';

const QuizPage = () => {
  const { isAuth, user } = useAuthContext();

  const { setQuizStateField, setMaxQuizTime } = useAppActions();

  const { data: questions } = useQuery({
    ...useGetAllQuestions(),
    enabled: isAuth && !!user?.username,
  });

  useEffect(() => {
    if (!!questions && questions.length > 0) {
      setQuizStateField({
        field: 'isStarted',
        data: true,
      });
      setMaxQuizTime({ questionsCounter: questions.length });
    }
  }, [questions]);

  return (
    <SideFull id="QuizPage">
      <SideSecond>
        <UserProfileForQuiz />
      </SideSecond>
      <SideMain
        style={{
          height: 'calc(100dvh - 8px - 60px - 18px - 18px - 1px)',
        }}
      >
        {'<QuestionList questions={questions ?? []} />'}
      </SideMain>
    </SideFull>
  );
};

export default QuizPage;
