import { iQuestionModel } from '../types/quizTypes';

const sortAscending = (questions: iQuestionModel[]) => questions.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

export default sortAscending;