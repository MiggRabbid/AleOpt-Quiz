import { iQuestion } from '../../../../types/iQuiz';
import { iUser, UserRoles } from '../../../../types/iUser';
import { typeAnswers, typeAnswersKeys, typeQuestionAnswer } from '../../../../types/types';

interface iUserInitialValues {
  role: UserRoles;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export const getUserInitialValue = (user: iUser | null) => {
  return !!user
    ? ({ ...user, password: '' } as iUserInitialValues)
    : {
        role: UserRoles.Employee,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      };
};

export const getQuestionInitialValue = (data?: iQuestion | null) => {
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
    answers: { a: '', b: '', c: '', d: '' },
    correctAnswerId: '',
  };
};
