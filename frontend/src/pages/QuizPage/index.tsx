// Библиотеки
import { LocalKeyMap, useAppActions, useAppSelector, useLocalStorage } from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
import { UserProfileForQuiz, QuestionListForQuiz } from '@/entities/quiz';
// Компоненты
import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { ResultListForQuiz } from '@/entities/quiz/ResultList/component';
import { useEffect, useLayoutEffect } from 'react';

const QuizPage = () => {
  const { setQuizStateField, setMaxQuizTime } = useAppActions();
  const { getLocalData, setLocalData } = useLocalStorage();

  const questions = useAppSelector(getQuizStateField('questions'));
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );
  const currentResult = useAppSelector(getQuizStateField('currentResult'));

  useLayoutEffect(() => {
    const oldTimer = getLocalData<LocalKeyMap.TIMER>({ key: LocalKeyMap.TIMER });
    const oldResult = getLocalData<LocalKeyMap.RESULT>({ key: LocalKeyMap.RESULT });

    console.log('oldTimer', oldTimer);

    if (!!oldTimer && !!oldResult) {
      setQuizStateField({
        field: 'quizTimer',
        data: oldTimer,
      });
      setQuizStateField({
        field: 'currentResult',
        data: oldResult,
      });

      setQuizStateField({
        field: 'questionIndex',
        data: oldResult.length,
      });
      setQuizStateField({
        field: 'allQuestionsCompleted',
        data: questions?.length === oldResult.length,
      });
    } else {
      setMaxQuizTime({ questionsCounter: questions?.length ?? 0 });
    }
    setQuizStateField({
      field: 'isStarted',
      data: true,
    });
    setQuizStateField({
      field: 'questions',
      data: questions ?? [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentResult.length > 0)
      setLocalData<LocalKeyMap.RESULT>({ key: LocalKeyMap.RESULT, data: currentResult });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentResult]);

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
        {allQuestionsCompleted ? <ResultListForQuiz /> : <QuestionListForQuiz />}
      </SideMain>
    </SideFull>
  );
};

export default QuizPage;
