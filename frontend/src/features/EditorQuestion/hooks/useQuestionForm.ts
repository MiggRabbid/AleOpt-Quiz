// Библиотеки
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
// Логика
import { FormData, userSchema } from '../config/schema';
import { api } from '@/shared/api/api';
import { useAppActions } from '@/hooks';
// Типизация
import { iQuestion } from '@/types/quiz.types';
import { typeQuestionAnswer } from '@/types/types.types';

interface IUseQuestionFormProps {
  isNewQuestion: boolean;
  questionId: string;
}

export const useQuestionForm = (props: IUseQuestionFormProps) => {
  const { isNewQuestion, questionId } = props;

  const { setQuizStateField, closeQuestionEditor } = useAppActions();
  const { data } = useSession();

  const token = data?.user?.token;

  const [savingAvailable, setSavingAvailable] = useState<boolean>(false);

  const {
    setValue,
    watch,
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

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
    const { createQuestion, updateQuestion } = api;

    if (!token) return;

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
        const response = await createQuestion(body, token);

        if (response.data) {
          setQuizStateField({ field: 'questions', data: response.data });
          closeQuestionEditor();
        }

        if (!response.data) {
          const userExists = response.error?.errorType === 'questionExists';
          setError('question', {
            message: userExists ? 'Такой вопрос уже существует' : ' ',
          });
          setError('a', { message: ' ' });
          setError('b', { message: ' ' });
          setError('c', { message: ' ' });
          setError('d', { message: ' ' });
          setError('correctAnswer', { message: ' ' });
        }
      }

      if (!isNewQuestion) {
        const response = await updateQuestion(body, token);

        if (response.data) {
          setQuizStateField({ field: 'questions', data: response.data });
          closeQuestionEditor();
        }

        if (!response.data) {
          setError('question', { message: 'Ошибка создания, проверьте данные' });
          setError('a', { message: ' ' });
          setError('b', { message: ' ' });
          setError('c', { message: ' ' });
          setError('d', { message: ' ' });
          setError('correctAnswer', { message: ' ' });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    savingAvailable,
    setValue,
    watch,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
};
