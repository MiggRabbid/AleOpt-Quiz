// Библиотеки
import { memo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
// Логика
import { getDataAnswersForDoughnut } from '../CustomBar/utils/getBarData';
import { getDoughnutData, getDoughnutOptions, customDoughnutTooltip } from './utils';
// Компоненты
import { CustomCardWrapper, PlugForEmptyData } from '@/shared/ui';
// Типизация
import type { FC } from 'react';
import type { TStatFuncsArgs } from '@app/types';

interface iCustomDoughnutProps {
  userStats: TStatFuncsArgs | null;
  isEmpty: boolean;
}

const CustomDoughnut: FC<iCustomDoughnutProps> = (props: iCustomDoughnutProps) => {
  const { userStats, isEmpty } = props;

  const questionsStats = getDataAnswersForDoughnut(userStats);
  const dataDoughnut = getDoughnutData(questionsStats);
  const optionsDoughnut = getDoughnutOptions(questionsStats, customDoughnutTooltip);

  return (
    <Box className="relative flex h-full w-full flex-col justify-center gap-1">
      <Typography
        align="center"
        className="ms-4! w-fit! text-lg! font-semibold! uppercase"
      >
        Диаграмма ответов
      </Typography>
      <CustomCardWrapper shadowSize="shadow-lg">
        <Box className="relative! flex aspect-square h-80 w-80 shrink-0 grow-0 items-center justify-center rounded-xl bg-cyan-100 px-4">
          {isEmpty && <PlugForEmptyData isSmall />}
          {!isEmpty && <Doughnut data={dataDoughnut} options={optionsDoughnut} />}
        </Box>
      </CustomCardWrapper>
    </Box>
  );
};

export default memo(CustomDoughnut);
