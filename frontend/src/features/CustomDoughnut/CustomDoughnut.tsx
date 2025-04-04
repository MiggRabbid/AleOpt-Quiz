'use client';
// Библиотеки
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
// Логика
import { getDataAnswersForDoughnut } from '../CustomBar/utils/getBarData';
import { getDoughnutData } from './utils/getDoughnutData';
import { getDoughnutOptions } from './utils/getDoughnutOptions';
// Компоненты
// Типизация
import { typeStatFuncsArgs } from '@/types/stats';
import { customDoughnutTooltip } from './utils/customDoughnutTooltip';

interface iCustomDoughnutProps {
  userStats: typeStatFuncsArgs | null;
}

const CustomDoughnut: React.FC<iCustomDoughnutProps> = (props: iCustomDoughnutProps) => {
  const { userStats } = props;

  // const questionsStats = getDataAnswersForDoughnut(userStats);
  // const dataDoughnut = getDatasetForDoughnut(type, currLabel, questionsStats);
  // const optionsDoughnut = getOptionsForDoughnut(questionsStats, currLabel, type);

  const questionsStats = getDataAnswersForDoughnut(userStats);
  const dataDoughnut = getDoughnutData(questionsStats);
  const optionsDoughnut = getDoughnutOptions(questionsStats, customDoughnutTooltip);

  return (
    <Box className="relative flex h-full w-full flex-col justify-center gap-1">
      <Typography
        align="center"
        className="ms-4! w-fit! text-base! font-semibold! uppercase"
      >
        Диаграмма ответов
      </Typography>
      <Box className="relative! w-full grow rounded-xl border-2 border-slate-200 px-4">
        <Doughnut data={dataDoughnut} options={optionsDoughnut} className="" />
      </Box>
    </Box>
  );
};

export { CustomDoughnut };
