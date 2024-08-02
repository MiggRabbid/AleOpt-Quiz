import { iQuestion } from '../../../../types/iQuiz';
import { typeAnswers, typeAnswersKeys } from '../../../../types/types';

export interface iInitialValues {
  question: string;
  answers: typeAnswers;
  correctAnswerId: string;
}

export const getNewQuestionId = (questions: iQuestion[] | undefined) => {
  if (!!questions?.length) {
    const lastId = questions[questions.length - 1].id;
    return `${parseInt(lastId, 10) + 1}`;
  }
  return '1';
};

export const getResponseBody = (value: iInitialValues, questionId: string) => {
  const body = {
    id: questionId,
    question: value.question,
    answers: Object.entries(value.answers).map(([id, answer]) => {
      return {
        questionId,
        id: id as typeAnswersKeys,
        answer,
      };
    }),
    correctAnswerId: value.correctAnswerId,
  };
  return body;
};

export const getAnswersKeys = (obj: typeAnswers): typeAnswersKeys[] => {
  return Object.keys(obj) as typeAnswersKeys[];
};
