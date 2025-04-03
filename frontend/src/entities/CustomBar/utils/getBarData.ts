import { barData } from '../types/CustomBar';

export const getBarData = (props: {
  labelLineOne: string;
  dataLineOne: number[];
  labelLineTwo: string;
  dataLineTwo: number[];
  xLabels: Array<number | string>;
}): barData => {
  const { xLabels, labelLineOne, dataLineOne, labelLineTwo, dataLineTwo } = props;

  return {
    labels: xLabels,
    datasets: [
      {
        label: labelLineOne,
        data: dataLineOne,
        backgroundColor: 'oklch(84.5% 0.143 164.978)',
        hoverBackgroundColor: 'oklch(84.5% 0.143 164.978)',
        borderColor: 'oklch(84.5% 0.143 164.978)',
      },
      {
        label: labelLineTwo,
        data: dataLineTwo,
        backgroundColor: 'oklch(71.2% 0.194 13.428)',
        hoverBackgroundColor: 'oklch(71.2% 0.194 13.428)',
        borderColor: 'oklch(71.2% 0.194 13.428)',
      },
    ],
  };
};
