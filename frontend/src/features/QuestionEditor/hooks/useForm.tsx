// Библиотеки
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
// Логика
import { schema } from '../config/schema';
// import { api } from '@app/';
import { useAppActions } from '@app/hooks';
// Типизация
import type { iHandledError, iQuestion, typeQuestionAnswer } from '@app/types';
import type { FormData } from '../config/schema';
import { useCreateQuestion, useEditQuestion } from '@/app/api/hooks';
import type { AxiosError } from 'axios';

interface IUseQuestionFormProps {
  isNewQuestion: boolean;
  questionId: string;
}

export const useQuestionForm = (props: IUseQuestionFormProps) => {
  const { isNewQuestion, questionId } = props;

  useEffect(() => {
    console.group('useQuestionForm props');
    console.log('isNewQuestion:', isNewQuestion);
    console.log('questionId:', questionId);
    console.groupEnd();
  }, [props]);

  const { setQuizStateField, closeQuestionEditor } = useAppActions();

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

  // eslint-disable-next-line react-hooks/incompatible-library
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
    // const { createQuestion, updateQuestion } = api;

    // if (!token) return;

    const answers: typeQuestionAnswer[] = [
      { questionId: questionId, id: 'a', answer: question.a },
      { questionId: questionId, id: 'b', answer: question.b },
      { questionId: questionId, id: 'c', answer: question.c },
      { questionId: questionId, id: 'd', answer: question.d },
    ];

    const body: iQuestion = {
      id: questionId,
      question: question.question,
      answers: answers,
      correctAnswerId: question.correctAnswer,
    };

    try {
      if (isNewQuestion) {
        createQuestion({ query: body, params: { id: questionId } });
      }
      if (!isNewQuestion) {
        editQuestion({ query: body, params: { id: questionId } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuccess = (data: iQuestion[]) => {
    setQuizStateField({ field: 'questions', data });
    closeQuestionEditor();
  };
  const handleError = (error: AxiosError<iHandledError, any>) => {
    const userExists = error.response?.data.errorType === 'questionExists';
    setError('question', {
      message: userExists ? 'Такой вопрос уже существует' : error.response?.data.message,
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
