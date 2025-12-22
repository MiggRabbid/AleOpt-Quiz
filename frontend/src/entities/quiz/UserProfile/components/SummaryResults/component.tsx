// Библиотеки
import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// Логика
import { useAppSelector, useAuthContext } from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
import { useGetAllQuestions } from '@/app/api/hooks';
// Компоненты
import { TimeCounter, TimeCounterEnded, AnswerCounter, CorrectAnswerCounter } from '..';

const SummaryResults = () => {
  const { isAuth, user } = useAuthContext();

  const { data: questions } = useQuery({
    ...useGetAllQuestions(),
    enabled: isAuth && !!user?.username,
  });
  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );

  if (!questions || questions?.length === 0) {
    return (
      <Box
        className="flex w-full grow flex-col items-center justify-center gap-10 rounded-2xl px-10 py-10"
        id="SummaryResultsForQuiz"
      >
        <CircularProgress color="success" size={40} />
      </Box>
    );
  }

  return (
    <Box
      className="flex flex-col items-center justify-center gap-10 rounded-2xl bg-slate-50 px-6 py-10 shadow-xl"
      id="SummaryResultsForQuiz"
    >
      {allQuestionsCompleted ? <TimeCounterEnded /> : <TimeCounter />}
      {allQuestionsCompleted ? (
        <CorrectAnswerCounter allQuestions={questions} />
      ) : (
        <AnswerCounter questionsIndex={questionsIndex} allQuestions={questions} />
      )}
    </Box>
  );
};

export { SummaryResults };
