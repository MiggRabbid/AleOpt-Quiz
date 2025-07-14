import { iQuestionStatsForDoughnut } from '@/types/stats.types';
import { doughnutOptions, ICustomDoughnutTooltip } from '../types/CustomDoughnut';
import {
  customTooltipFooter,
  customTooltipLabel,
  customTooltipTitle,
} from './customDoughnutTooltip';

export const getDoughnutOptions = (
  questionsStats: iQuestionStatsForDoughnut | null,
  // eslint-disable-next-line no-unused-vars
  customTooltip?: (context: ICustomDoughnutTooltip) => void,
): doughnutOptions => {
  return {
    aspectRatio: 1,
    responsive: true,
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
      },
      tooltip: {
        intersect: true,
        backgroundColor: 'oklch(98.5% 0 0)',
        bodyColor: 'oklch(20.8% 0.042 265.755)',
        titleColor: 'oklch(70.4% 0.04 256.788)',
        footerColor: 'oklch(70.4% 0.04 256.788)',
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          size: 14,
        },
        footerAlign: 'right',
        axis: 'xy',
        callbacks: {
          title(context) {
            return customTooltipTitle(questionsStats, context);
          },
          label(context) {
            return customTooltipLabel(context);
          },
          footer(context) {
            return customTooltipFooter(questionsStats, context);
          },
        },
        enabled: !!customTooltip ? false : true,
        external: !!customTooltip ? customTooltip : undefined,
        padding: 10,
        boxPadding: 5,
        xAlign: 'center',
        yAlign: 'top',
      },
    },
    cutout: 60,
  };
};
