import type { IQuestionStatsForAllUsers, IQuestionStatsForUser } from '@app/types';

interface ILastTenAttempts {
  labelLineOne: 'Правильные';
  dataLineOne: number[];
  labelLineTwo: 'Неправильные';
  dataLineTwo: number[];
  xLabels: Array<number | string>;
}

const MAX_LENGTH = 10;

const initialData: ILastTenAttempts = {
  labelLineOne: 'Правильные',
  dataLineOne: new Array(MAX_LENGTH).fill(0),
  labelLineTwo: 'Неправильные',
  dataLineTwo: new Array(MAX_LENGTH).fill(0),
  xLabels: new Array(MAX_LENGTH).fill(''),
};

export const preparingQuestionStatsForAllUsers = (props: {
  questionStats: IQuestionStatsForAllUsers;
}) => {
  const { questionStats } = props;
  const { labelLineOne, labelLineTwo } = initialData;

  if (!questionStats || questionStats.results.length === 0) return initialData;

  const dataLineOne: number[] = [];
  const dataLineTwo: number[] = [];
  const xLabels: Array<number | string> = [];

  questionStats.results.forEach((item: IQuestionStatsForUser) => {
    const { firstName, lastName, correctAnswers, numberAttempts } = item;
    const incorrectAnswers = numberAttempts - correctAnswers;
    dataLineOne.push(correctAnswers);
    dataLineTwo.push(incorrectAnswers);
    xLabels.push(`${firstName} ${lastName.slice(0, 1)}.`);
  });

  return {
    dataLineOne: dataLineOne,
    labelLineOne,
    dataLineTwo: dataLineTwo,
    labelLineTwo,
    xLabels: xLabels,
  };
};
