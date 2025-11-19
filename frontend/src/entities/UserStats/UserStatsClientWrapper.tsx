'use client';
// Библиотеки
import { Box } from '@mui/material';
import React from 'react';
// Логика
import { preparingLastTenAttempts } from './utils/preparingDataForBar';
import {
  getCorrectAnswersSummary,
  getIncorrectAnswersSummary,
} from './utils/getQuestionSummaryFromAttempts';
// Компоненты
import { QuestionBlock } from './ui/QuestionBlock';
import { CustomDoughnut } from '@/features/CustomDoughnut';
import { CustomBar } from '@/features/CustomBar';
// Типизация
import { IUserStatsProps } from './UserStats.types';

const UserStatsClientWrapper = (props: IUserStatsProps) => {
  const { userStats } = props;
  const attempts = userStats?.attempts || null;

  const { dataLineOne, labelLineOne, dataLineTwo, labelLineTwo, xLabels } =
    preparingLastTenAttempts({ attempts });

  const easiestQuestions = getCorrectAnswersSummary(attempts);
  const hardestQuestions = getIncorrectAnswersSummary(attempts);

  return (
    <>
      <Box className="flex w-full grow gap-8">
        <QuestionBlock type="easiest" questions={easiestQuestions} />
        <QuestionBlock type="hardest" questions={hardestQuestions} />
      </Box>
      <Box className="flex h-fit shrink-1 grow-0 gap-8">
        <Box className="h-fit w-fit shrink-0 grow-0">
          <CustomDoughnut userStats={userStats} isEmpty={!attempts} />
        </Box>
        <Box className="h-fit grow">
          <CustomBar
            dataLineOne={dataLineOne}
            labelLineOne={labelLineOne}
            dataLineTwo={dataLineTwo}
            labelLineTwo={labelLineTwo}
            xLabels={xLabels}
            customTooltipType="lastTenAttemptsTooltip"
            isEmpty={!attempts}
          />
        </Box>
      </Box>
    </>
  );
};

export default React.memo(UserStatsClientWrapper);
