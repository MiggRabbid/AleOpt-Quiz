// Библиотеки
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
// Логика
import { schema } from '../config/schema';
import { useCreateQuestion, useEditQuestion } from '@/app/api/hooks';
import { useAppActions } from '@app/hooks';
// Типизация
import type { iHandledError, iQuestion, typeQuestionAnswer } from '@app/types';
import type { FormData } from '../config/schema';
import type { AxiosError } from 'axios';

interface IUseQuestionFormProps {
  isNewQuestion: boolean;
  questionId: string;
}

export const useQuestionForm = (props: IUseQuestionFormProps) => {
  const { isNewQuestion, questionId } = props;

  const { setQuizStateField, closeQuestionEditor } = useAppActions();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: createQuestion } = useCreateQuestion({
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => handleError(error),
  });

  const { mutateAsync: editQuestion } = useEditQuestion({
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => handleError(error),
  });

  const [savingAvailable, setSavingAvailable] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const {
    setValue,
    watch,
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isLoading },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isLoading || isSubmitting) setIsFetching(true);
  }, [isSubmitting, isLoading]);

  const currQuestion = watch('question');
  const answerA = watch('a');
  const answerB = watch('b');
  const answerC = watch('c');
  const answerD = watch('d');
  const correctAnswer = watch('correctAnswer');

  useEffect(() => {
    const questionIsEmpty = !currQuestion || currQuestion.length === 0;
    const answerAIsEmpty = !answerA || answerA.length === 0;
    const answerBIsEmpty = !answerB || answerB.length === 0;
    const answerCIsEmpty = !answerC || answerC.length === 0;
    const answerDIsEmpty = !answerD || answerD.length === 0;

    setSavingAvailable(
      !questionIsEmpty &&
        !answerAIsEmpty &&
        !answerBIsEmpty &&
        !answerCIsEmpty &&
        !answerDIsEmpty &&
        !!correctAnswer,
    );
  }, [currQuestion, answerA, answerB, answerC, answerD, correctAnswer]);

  const onSubmit = async (question: FormData) => {
    const answers: typeQuestionAnswer[] = [
      { questionId: questionId, id: 'a', answer: question.a },
      { questionId: questionId, id: 'b', answer: question.b },
      { questionId: questionId, id: 'c', answer: question.c },
      { questionId: questionId, id: 'd', answer: question.d },
    ];

    const query: iQuestion = {
      id: questionId,
      question: question.question,
      answers: answers,
      correctAnswerId: question.correctAnswer,
    };

    try {
      if (isNewQuestion) {
        createQuestion({ query, params: { id: questionId } });
      }
      if (!isNewQuestion) {
        editQuestion({ query, params: { id: questionId } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuccess = (data: iQuestion[]) => {
    if (isNewQuestion) {
      enqueueSnackbar('Вопрос создан', { variant: 'success' });
    } else {
      enqueueSnackbar('Вопрос обновлён', { variant: 'success' });
    }
    setQuizStateField({ field: 'questions', data });
    closeQuestionEditor();
  };
  const handleError = (error: AxiosError<iHandledError, any>) => {
    const questionExists = error.response?.data.errorType === 'questionExists';
    setError('question', {
      message: questionExists
        ? 'Такой вопрос уже существует'
        : error.response?.data.message,
    });
    setError('a', { message: ' ' });
    setError('b', { message: ' ' });
    setError('c', { message: ' ' });
    setError('d', { message: ' ' });
    setError('correctAnswer', { message: ' ' });
    setIsFetching(false);
  };

  return {
    savingAvailable,
    setValue,
    watch,
    register,
    handleSubmit,
    errors,
    isSubmitting: isFetching,
    onSubmit,
  };
};
