// Библиотеки
import { Box } from '@mui/material';
// Логика
import { preparingLastTenAttempts } from './utils/preparingDataForBar';
import {
  getCorrectAnswersSummary,
  getIncorrectAnswersSummary,
} from './utils/getQuestionSummaryFromAttempts';
// Компоненты
import { QuestionBlock } from './ui/QuestionBlock';
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
    <Box className="flex h-full w-full flex-col gap-10 p-2" id="UserStats">
      <Box className="flex w-full grow gap-10">
        <QuestionBlock type="easiest" questions={easiestQuestions} />
        <QuestionBlock type="hardest" questions={hardestQuestions} />
      </Box>
      <Box className="flex h-fit shrink-1 grow-0 gap-10">
        <Box className="h-fit w-fit shrink-0 grow-0">
          <CustomDoughnut userStats={userStats} />
        </Box>
        <Box className="h-fit grow">
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
