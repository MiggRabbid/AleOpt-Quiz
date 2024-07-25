import { ChartData, ChartOptions } from 'chart.js';
import { CHART_COLORS } from './getSegmentColor';
import {
  iQuestionStatsForDoughnut,
  typeDoughnut,
} from '../../../../../../types/iStats';
import {
  getDataEasyQuestionsDoughnut,
  getDataHardQuestionsDoughnut,
  getLabelQuestionsDoughnut,
} from './forDataDoughnut';
import {
  customTooltipTitle,
  customTooltipLabel,
  customTooltipFooter,
} from '../Tooltip/utils/customTooltip';

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
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 16,
        },
        footerFont: {
          size: 16,
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
        intersect: true,
        padding: 10,
        boxPadding: 5,
      },
    },
    responsive: true,
    cutout: 70,
  };
};
