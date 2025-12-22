// Библиотеки
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box, Typography } from '@mui/material';
// Логика
import { getBarData, getBarOptions } from './utils';
import { lastTenAttemptsTooltip, PlugForEmptyData } from '@/shared/ui';
// Компоненты

Chart.register(...registerables);

const tooltipMap = {
  lastTenAttemptsTooltip: lastTenAttemptsTooltip,
} as const;

export type CustomTooltipType = keyof typeof tooltipMap;

export interface ICustomLineProps {
  labelLineOne: string;
  dataLineOne: number[];
  labelLineTwo: string;
  dataLineTwo: number[];
  xLabels: Array<number | string>;
  customTooltipType?: CustomTooltipType;
  isEmpty: boolean;
}

const CustomBar = (props: ICustomLineProps) => {
  const {
    xLabels,
    dataLineOne,
    labelLineOne,
    dataLineTwo,
    labelLineTwo,
    customTooltipType,
    isEmpty,
  } = props;

  const data = getBarData({
    xLabels,
    labelLineOne,
    dataLineOne,
    labelLineTwo,
    dataLineTwo,
  });

  const customTooltip = !!customTooltipType ? tooltipMap[customTooltipType] : undefined;

  const options = getBarOptions({
    customTooltip,
    isEmptyData: [...dataLineOne, ...dataLineTwo].length === 0,
  });

  return (
    <Box className="flex h-fit! min-h-full flex-col justify-center gap-1">
      <Typography
        align="center"
        className="ms-4! w-fit! text-lg! font-semibold! uppercase"
      >
        Динамика попыток
      </Typography>
      <Box className="h-80 rounded-xl bg-cyan-100 p-4 shadow-none transition-shadow duration-500 hover:shadow-lg">
        {isEmpty && <PlugForEmptyData isSmall />}
        {!isEmpty && <Bar data={data} options={options} />}
      </Box>
    </Box>
  );
};

export default React.memo(CustomBar);
