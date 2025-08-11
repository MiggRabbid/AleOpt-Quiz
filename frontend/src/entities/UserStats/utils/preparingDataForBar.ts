import { iResultEntry } from '@/types/staff.types';

interface ILastTenAttempts {
  labelLineOne: 'Правильные';
  dataLineOne: number[];
  labelLineTwo: 'Неправильные';
  dataLineTwo: number[];
  xLabels: Array<number | string>;
}

function fillArrayToLength<T>(arr: T[], length: number, filler: T): T[] {
  const result = [...arr];
  while (result.length < length) {
    result.push(filler);
  }
  return result;
}

const MAX_LENGTH = 10;

const initialData: ILastTenAttempts = {
  labelLineOne: 'Правильные',
  dataLineOne: new Array(MAX_LENGTH).fill(0),
  labelLineTwo: 'Неправильные',
  dataLineTwo: new Array(MAX_LENGTH).fill(0),
  xLabels: new Array(MAX_LENGTH).fill(''),
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

  return {
    dataLineOne: fillArrayToLength(dataLineOne, MAX_LENGTH, 0),
    labelLineOne,
    dataLineTwo: fillArrayToLength(dataLineTwo, MAX_LENGTH, 0),
    labelLineTwo,
    xLabels: fillArrayToLength(xLabels, MAX_LENGTH, ''),
  };
};
