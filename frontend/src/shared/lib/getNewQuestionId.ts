import { iQuestion } from '@/types/quiz.types';

export const getNewQuestionId = (questions: iQuestion[] | undefined) => {
  if (!!questions?.length) {
    const lastId = questions[questions.length - 1].id;
    return `${parseInt(lastId, 10) + 1}`;
  }
  return '1';
};
