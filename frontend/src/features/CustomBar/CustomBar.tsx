'use client';
// Библиотеки
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box, Typography } from '@mui/material';
// Логика
import { getBarData } from './utils/getBarData';
import { getBarOptions } from './utils/getBarOptions';
// Компоненты
import { lastTenAttemptsTooltip } from '../../entities/UserStats/ui/CustomTooltip';
import { PlugForEmptyData } from '@/shared/ui/ui/Plug/PlugForEmptyData';

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
      <Box className="h-80 rounded-xl bg-cyan-100 p-4">
        {isEmpty && <PlugForEmptyData isSmall />}
        {!isEmpty && <Bar data={data} options={options} />}
      </Box>
    </Box>
  );
};

export default React.memo(CustomBar);
