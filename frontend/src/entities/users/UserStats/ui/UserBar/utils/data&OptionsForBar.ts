import { ChartData, ChartOptions } from 'chart.js';

import {
  getDataCorrectAnswersCounts,
  getDataIncorrectAnswersCounts,
  getMaxYScale,
} from './forDataBar';

import { typeStatFuncsArgs } from '../../../../../../types/iStats';

export const getDatasetForBar = (userStats: typeStatFuncsArgs): ChartData<'bar'> => {
  return {
    labels: userStats?.attempts.map((item) => item.data),
    datasets: [
      {
        label: 'Правильные ответы',
        data: getDataCorrectAnswersCounts(userStats),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Неправленые ответы',
        data: getDataIncorrectAnswersCounts(userStats),
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
};

export const getOptionsForBar = (userStats: typeStatFuncsArgs): ChartOptions<'bar'> => {
  return {
    animation: {
      duration: 1000,
      easing: 'easeInCubic',
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Диаграмма результатов тестирования',
      },
      tooltip: {
        enabled: true,
        intersect: true,
        padding: 10,
        boxPadding: 5,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: getMaxYScale(userStats),
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
  };
};
