// Библиотеки
import { memo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
// Логика
import { useGetAllQuestions, useUpdateUserStats } from '@/app/api/hooks';
import { useAppActions, useAppSelector, useAuthContext } from '@/app/hooks';
import { getQuizStateField } from '@/app/selectors';
import { getFormattedDate } from '@/shared/lib';
// Компоненты
import { QuestionListItem } from './components';
import { CustomList, CustomListItem, PlugForEmptyData } from '@/shared/ui';
// Типизация
import type { iQuestion, iResultEntryRequest } from '@/app/types';

const QuestionListForQuiz = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuth, user } = useAuthContext();

  const { setQuizStateField, setMaxQuizTime } = useAppActions();

  const currentResult = useAppSelector(getQuizStateField('currentResult'));

  const {
    data: questions,
    isFetching,
    isPending,
    isLoading,
  } = useQuery({
    ...useGetAllQuestions(),
    enabled: isAuth && !!user?.username,
  });

  const { mutateAsync: saveResults } = useUpdateUserStats({
    onSuccess: () =>
      enqueueSnackbar('Результаты успешно сохранены!', { variant: 'success' }),
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

  const saveAttemptResult = useCallback(() => {
    if (currentResult && currentResult.length > 0) {
      const data: iResultEntryRequest = {
        data: getFormattedDate(),
        answers: currentResult,
      };

      saveResults({
        params: {
          username: user?.username ?? '',
        },
        query: data,
      });
    }
  }, [currentResult]);

  return (
    <CustomList>
      {!!questions && questions.length > 0 ? (
        questions.map((question: iQuestion, index: number) => {
          return (
            <QuestionListItem
              questionsLength={questions?.length ?? 0}
              currIndex={index}
              question={question}
              key={`QuestionListItem-${question.id}-${index}`}
              saveAttemptResult={saveAttemptResult}
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
