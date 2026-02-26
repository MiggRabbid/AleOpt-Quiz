// Библиотеки
import { memo, useMemo } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// Логика
import {
  getCorrectAnswersSummary,
  getIncorrectAnswersSummary,
  preparingLastTenAttempts,
} from './utils';
import { useGetUserStats } from '@app/api/hooks';
import { useAuthContext } from '@app/hooks';
// Компоненты
import { QuestionBlock } from './components';
import { CustomBar, CustomDoughnut } from '@/features';

interface iUserStatsProps {
  currentUser?: string;
}

const UserStats = ({ currentUser }: iUserStatsProps) => {
  const { isAuth, user } = useAuthContext();
  const { data: userStats } = useQuery({
    ...useGetUserStats({
      params: {
        username: !!currentUser ? currentUser : (user?.username ?? ''),
      },
    }),
    enabled: isAuth && !!user?.username,
  });

  const attempts = useMemo(() => userStats?.attempts || null, [userStats]);

  const { dataLineOne, labelLineOne, dataLineTwo, labelLineTwo, xLabels } =
    preparingLastTenAttempts({ attempts });

  const easiestQuestions = useMemo(() => getCorrectAnswersSummary(attempts), [attempts]);
  const hardestQuestions = useMemo(
    () => getIncorrectAnswersSummary(attempts),
    [attempts],
  );

  return (
    <Box className="flex h-full w-full flex-col gap-8" id="UserStats">
      <Box className="flex w-full grow flex-wrap gap-8">
        <QuestionBlock type="easiest" questions={easiestQuestions} />
        <QuestionBlock type="hardest" questions={hardestQuestions} />
      </Box>
      <Box className="flex h-fit shrink-1 grow-0 flex-wrap justify-start gap-8 xl:justify-around!">
        <Box className="h-fit w-fit shrink-0 grow-0">
          <CustomDoughnut userStats={userStats} isEmpty={!attempts} />
        </Box>
        <Box className="h-fit w-fit max-w-[calc(100%_-_320px_-_32px_-_1px)] min-w-150 shrink-1 grow-1">
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
    </Box>
  );
};

export default memo(UserStats);
