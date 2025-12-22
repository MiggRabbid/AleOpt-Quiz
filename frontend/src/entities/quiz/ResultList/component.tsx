// Библиотеки
import { useQuery } from '@tanstack/react-query';
// Логика
import { useAppSelector, useAuthContext } from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
import { useGetAllQuestions } from '@/app/api/hooks';
// Компоненты
import { ResultListItem } from './components';
import { CustomList } from '@/shared/ui';

const ResultListForQuiz = () => {
  const { isAuth, user } = useAuthContext();

  const currentResult = useAppSelector(getQuizStateField('currentResult'));

  const { data: questions } = useQuery({
    ...useGetAllQuestions(),
    enabled: isAuth && !!user?.username,
  });

  return (
    <CustomList classNames="h-full w-full overflow-y-auto!">
      {currentResult.map((question, index) => (
        <ResultListItem
          questions={questions ?? []}
          question={question}
          index={index}
          key={`ResultListItem-${question.questionId}-${index}`}
        />
      ))}
    </CustomList>
  );
};

export { ResultListForQuiz };
