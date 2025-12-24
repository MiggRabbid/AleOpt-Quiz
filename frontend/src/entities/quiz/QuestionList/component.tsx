// Библиотеки
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
// Логика
import { useGetAllQuestions } from '@/app/api/hooks';
import { useAppActions, useAuthContext } from '@/app/hooks';
// Компоненты
import { QuestionListItem } from './components';
import { CustomList, CustomListItem, PlugForEmptyData } from '@/shared/ui';
// Типизация
import type { iQuestion } from '@/app/types';

const QuestionListForQuiz = () => {
  const { isAuth, user } = useAuthContext();

  const { setQuizStateField, setMaxQuizTime } = useAppActions();

  const {
    data: questions,
    isFetching,
    isPending,
    isLoading,
  } = useQuery({
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
    <CustomList>
      {!!questions && questions.length > 0 ? (
        questions.map((question: iQuestion, index: number) => {
          return (
            <QuestionListItem
              questions={questions ?? []}
              currIndex={index}
              question={question}
              key={`QuestionListItem-${question.id}-${index}`}
            />
          );
        })
      ) : (
        <CustomListItem
          classNames="bg-slate-50"
          shadowSize="shadow-none"
          paddingY="py-10!"
        >
          <PlugForEmptyData isLoading={isLoading || isFetching || isPending} />
        </CustomListItem>
      )}
    </CustomList>
  );
};

export default memo(QuestionListForQuiz);
