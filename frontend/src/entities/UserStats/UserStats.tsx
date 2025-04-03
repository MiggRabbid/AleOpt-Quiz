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
import CustomBar from '../CustomBar/CustomBar';
// Типизация
import { iUserStats } from '@/types/stats';

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
      <Box className="flex gap-5">
        <QuestionBlock type="easiest" questions={easiestQuestions} />
        <QuestionBlock type="hardest" questions={hardestQuestions} />
      </Box>
      <Box className="max-w-1/2">
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
  );
};

export { UserStats };
