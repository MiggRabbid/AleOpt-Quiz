import type { IQuestionModel } from '../modules/quiz/quiz.types';

const sortAscending = (questions: IQuestionModel[]) =>
  questions.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

export default sortAscending;
