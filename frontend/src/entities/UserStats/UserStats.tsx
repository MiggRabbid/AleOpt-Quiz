// Библиотеки
import { Box } from '@mui/material';
// Логика
import { preparingLastTenAttempts } from './utils/preparingDataForBar';
import {
  getCorrectAnswersSummary,
  getIncorrectAnswersSummary,
} from './utils/getQuestionSummaryFromAttempts';
// Компоненты
import { QuestionBlock } from './components/QuestionBlock';
import CustomBar from '../../features/CustomBar/CustomBar';
// Типизация
import { iUserStats } from '@/types/stats';
import { CustomDoughnut } from '@/features/CustomDoughnut/CustomDoughnut';

interface IUserStatsProps {
  userStats: iUserStats | null;
}

const UserStats = (props: IUserStatsProps) => {
  const { userStats } = props;
  const attempts = userStats?.attempts || null;

  const { dataLineOne, labelLineOne, dataLineTwo, labelLineTwo, xLabels } =
    preparingLastTenAttempts({ attempts });

  const easiestQuestions = getCorrectAnswersSummary(attempts);
  const hardestQuestions = getIncorrectAnswersSummary(attempts);

  return (
    <Box className="flex h-full w-full flex-col gap-5" id="UserStats">
      <Box className="flex w-full grow gap-6">
        <QuestionBlock type="easiest" questions={easiestQuestions} />
        <QuestionBlock type="hardest" questions={hardestQuestions} />
      </Box>
      <Box className="flex w-full shrink-1 grow-3 gap-6">
        <Box className="max-w-3/12 shrink-0 grow-1">
          <CustomDoughnut userStats={userStats} />
        </Box>
        <Box className="max-w-9/12 shrink grow">
          <CustomBar
            dataLineOne={dataLineOne}
            labelLineOne={labelLineOne}
            dataLineTwo={dataLineTwo}
            labelLineTwo={labelLineTwo}
            xLabels={xLabels}
            customTooltipType="lastTenAttemptsTooltip"
          />
        </Box>
      </Box>
    </Box>
  );
};

export { UserStats };
