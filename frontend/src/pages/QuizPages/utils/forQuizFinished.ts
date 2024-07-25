import { iQuestion } from '../../../types/iQuiz';

export const getQuestion = (questions: iQuestion[], id: string): iQuestion => {
  const result = questions.filter((item) => item.id === id);
  return result[0];
};

export const getAnswerBg = (
  correctAnswer: string,
  currentAnswer: string,
  userAnswer: string,
) => {
  if (currentAnswer === correctAnswer) {
    return correctAnswer === userAnswer
      ? 'bg-success-subtle'
      : 'bg-primary-subtle';
  }

  if (currentAnswer === userAnswer) {
    return correctAnswer !== userAnswer ? 'bg-danger-subtle' : '';
  }

  return '';
};
