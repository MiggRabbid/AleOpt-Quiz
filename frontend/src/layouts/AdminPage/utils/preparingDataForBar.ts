import { iResultEntry } from '@/types/staff';

interface ILastTenAttempts {
  labelLineOne: 'Правильные';
  dataLineOne: number[];
  labelLineTwo: 'Неправильные';
  dataLineTwo: number[];
  xLabels: Array<number | string>;
}

const initialData: ILastTenAttempts = {
  labelLineOne: 'Правильные',
  dataLineOne: [],
  labelLineTwo: 'Неправильные',
  dataLineTwo: [],
  xLabels: ['', '', '', '', '', '', '', '', '', ''],
};

export const preparingLastTenAttempts = (props: {
  attempts: iResultEntry[] | null;
}): ILastTenAttempts => {
  const { attempts } = props;
  const { labelLineOne, labelLineTwo } = initialData;

  if (!attempts || attempts.length === 0) return initialData;

  const dataLineOne: number[] = [];
  const dataLineTwo: number[] = [];
  const xLabels: Array<number | string> = [];

  attempts.forEach((item: iResultEntry) => {
    const { data, correctAnswers, answers } = item;
    const incorrectAnswers = answers.length - correctAnswers;
    dataLineOne.push(correctAnswers);
    dataLineTwo.push(incorrectAnswers);
    xLabels.push(data);
  });

  return { dataLineOne, labelLineOne, dataLineTwo, labelLineTwo, xLabels };
};
