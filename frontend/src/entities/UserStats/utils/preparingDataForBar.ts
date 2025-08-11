import { iResultEntry } from '@/types/staff.types';

interface ILastTenAttempts {
  labelLineOne: 'Правильные';
  dataLineOne: number[];
  labelLineTwo: 'Неправильные';
  dataLineTwo: number[];
  xLabels: Array<number | string>;
}

const initialData: ILastTenAttempts = {
  labelLineOne: 'Правильные',
  dataLineOne: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  labelLineTwo: 'Неправильные',
  dataLineTwo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  xLabels: ['', '', '', '', '', '', '', '', '', ''],
};

export const preparingLastTenAttempts = (props: {
  attempts: iResultEntry[] | null;
}): ILastTenAttempts => {
  const { attempts } = props;
  const {
    labelLineOne,
    dataLineOne: initDataLineOne,
    labelLineTwo,
    dataLineTwo: initDataLineTwo,
    xLabels: initXLabels,
  } = initialData;

  if (!attempts || attempts.length === 0) return initialData;

  const dataLineOne: number[] = initDataLineOne;
  const dataLineTwo: number[] = initDataLineTwo;
  const xLabels: Array<number | string> = initXLabels;

  attempts.forEach((item: iResultEntry, index: number) => {
    const { data, correctAnswers, answers } = item;
    const incorrectAnswers = answers.length - correctAnswers;
    dataLineOne[index] = correctAnswers;
    dataLineTwo[index] = incorrectAnswers;
    xLabels[index] = data;
  });

  return { dataLineOne, labelLineOne, dataLineTwo, labelLineTwo, xLabels };
};
