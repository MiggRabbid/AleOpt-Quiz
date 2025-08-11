import { barOptions, ICustomBarTooltip } from '../types/CustomBar';

export const getBarOptions = (props: {
  // eslint-disable-next-line no-unused-vars
  customTooltip?: (context: ICustomBarTooltip) => void;
  isEmptyData?: boolean;
}): barOptions => {
  const { customTooltip, isEmptyData } = props;
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: true,
      mode: 'index',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'oklch(84.5% 0.143 164.978)',
        bodyColor: 'rgb(43, 54, 72)',
        titleColor: 'rgba(140, 157, 175, 1)',
        intersect: true,
        position: 'nearest',
        enabled: !!customTooltip ? false : true,
        external: !!customTooltip ? customTooltip : undefined,
      },
    },
    scales: {
      x: {
        title: { display: false },
        grid: {
          display: false,
        },
        stacked: true,
        offset: true,
        suggestedMax: 10,
        suggestedMin: 10,
      },
      y: {
        title: { display: false },
        beginAtZero: true,
        ticks: {
          color: 'oklch(12.9% 0.042 264.695)',
          maxTicksLimit: 7,
        },
        grid: {
          tickColor: 'transparent',
          lineWidth: 1,
          color: 'oklch(92.9% 0.013 255.508)',
        },

        stacked: true,
        suggestedMin: isEmptyData ? 100 : undefined,
      },
    },
  };
};
