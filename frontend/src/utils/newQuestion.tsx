import { iQuestion } from '../models/interfaces';
import {
  typeAnswers,
  typeAnswersKeys,
  typeQuestionAnswer,
} from '../models/types';

export interface iInitialValues {
  question: string;
  answers: typeAnswers;
  correctAnswerId: string;
}

export const getNewQuestionId = (
  questions: iQuestion[] | undefined,
) => {
  if (questions && questions.length > 0) {
    const lastId = questions[questions.length - 1].id;
    return `${parseInt(lastId, 10) + 1}`;
  }
  return '1';
};

export const getInitialValue = (
  data?: iQuestion | null,
): iInitialValues => {
  if (!!data) {
    const curAnswers: typeAnswers = data.answers.reduce(
      (acc, answer: typeQuestionAnswer) => {
        acc[answer.id as typeAnswersKeys] = answer.answer;
        return acc;
      },
      { a: '', b: '', c: '', d: '' },
    );
    return {
      question: data.question,
      answers: curAnswers,
      correctAnswerId: data.correctAnswerId,
    };
  }

  return {
    question: '',
    answers: {
      a: '',
      b: '',
      c: '',
      d: '',
    },
    correctAnswerId: '',
  };
};

export const getResponseBody = (
  value: iInitialValues,
  questionId: string,
) => {
  const body = {
    id: questionId,
    question: value.question,
    answers: Object.entries(value.answers).map(
      ([id, answer]) => {
        return {
          questionId,
          id: id as typeAnswersKeys,
          answer,
        };
      },
    ),
    correctAnswerId: value.correctAnswerId,
  };
  return body;
};

export const getAnswersKeys = (obj: typeAnswers) => {
  return Object.keys(obj) as typeAnswersKeys[];
};
