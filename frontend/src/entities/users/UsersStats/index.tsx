// Библиотеки
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// Логика
import {
  getCorrectAnswersSummary,
  getIncorrectAnswersSummary,
  preparingLastTenAttempts,
} from './utils';
import { useGetUserStats } from '@/app/api/hooks';
import { useAuthContext } from '@/app/hooks';
// Компоненты
import { QuestionBlock } from './components';
import { CustomBar } from '@/features/CustomBar';
import { CustomDoughnut } from '@/features/CustomDoughnut';

const UserStats = () => {
  const { isAuth, user } = useAuthContext();
  const { data: userStats } = useQuery({
    ...useGetUserStats({
      query: {
        username: user?.username ?? '',
      },
    }),
    enabled: isAuth,
  });

  const attempts = userStats?.attempts || null;

  const { dataLineOne, labelLineOne, dataLineTwo, labelLineTwo, xLabels } =
    preparingLastTenAttempts({ attempts });

  const easiestQuestions = getCorrectAnswersSummary(attempts);
  const hardestQuestions = getIncorrectAnswersSummary(attempts);

  return (
    <Box className="flex h-full w-full flex-col gap-8" id="UserStats">
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
    </Box>
  );
};

export default UserStats;
