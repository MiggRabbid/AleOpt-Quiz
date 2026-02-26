import { customTooltipFooter, customTooltipLabel, customTooltipTitle } from '.';

import type {
  iQuestionStatsForDoughnut,
  TDoughnutOptions,
  ICustomDoughnutTooltip,
} from '@app/types';

export const getDoughnutOptions = (
  questionsStats: iQuestionStatsForDoughnut | null,
  // eslint-disable-next-line no-unused-vars
  customTooltip?: (context: ICustomDoughnutTooltip) => void,
): TDoughnutOptions => {
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
        display: false,
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
          title(context: unknown) {
            return customTooltipTitle(questionsStats, context);
          },
          label(context: unknown) {
            return customTooltipLabel(context);
          },
          footer(context: unknown) {
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
