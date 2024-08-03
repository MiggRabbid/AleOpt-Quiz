import { ChartData, ChartOptions } from 'chart.js';

import { CHART_COLORS } from './getSegmentColor';
import {
  getDataEasyQuestionsDoughnut,
  getDataHardQuestionsDoughnut,
  getLabelQuestionsDoughnut,
} from './forDataDoughnut';
import {
  customTooltipTitle,
  customTooltipLabel,
  customTooltipFooter,
} from '../Tooltip/utils/customDoughnutTooltip';

import { iQuestionStatsForDoughnut, typeDoughnut } from '../../../../../../types/iStats';

export const getDatasetForDoughnut = (
  type: typeDoughnut,
  currLabel: string,
  questionsStats: iQuestionStatsForDoughnut | null,
): ChartData<'doughnut'> => {
  const dataset =
    type === typeDoughnut.easy
      ? getDataEasyQuestionsDoughnut(questionsStats)
      : getDataHardQuestionsDoughnut(questionsStats);
  return {
    labels: getLabelQuestionsDoughnut(questionsStats),
    datasets: [
      {
        label: currLabel,
        data: dataset,
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  };
};

export const getOptionsForDoughnut = (
  questionsStats: iQuestionStatsForDoughnut | null,
  currLabel: string,
  type: typeDoughnut,
): ChartOptions<'doughnut'> => {
  return {
    animation: {
      duration: 1000,
      easing: 'easeInCubic',
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: currLabel,
      },
      tooltip: {
        intersect: true,
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        footerFont: {
          size: 12,
        },
        footerAlign: 'right',
        callbacks: {
          title(context) {
            return customTooltipTitle(questionsStats, context);
          },
          label(context) {
            return customTooltipLabel(type, context);
          },
          footer(context) {
            return customTooltipFooter(questionsStats, context);
          },
        },
        padding: 10,
        boxPadding: 5,
        xAlign: 'center',
        yAlign: 'top',
      },
    },
    cutout: 60,
  };
};
