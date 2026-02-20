import type { IQuestionStatsForAllUsers } from '@/app/types';
import { preparingQuestionStatsForAllUsers } from '@/entities/admin/AdminStats/utils';
import { CustomBar } from '@/features/charts';
import { CustomAppChip, PlugForEmptyData, type ICustomAppChipProps } from '@/shared/ui';
import { Box, Typography } from '@mui/material';
import { memo, useMemo } from 'react';

interface IQuestionResult {
  numberAttempts: number | null;
  correctAnswers: number | null;
  averageResult: number | null;
}

interface IQuestionStatsItemProps extends ICustomAppChipProps {
  label: string;
  result: number | null;
}

const INIT_QUESTION_RESULTS: IQuestionResult = {
  numberAttempts: null,
  correctAnswers: null,
  averageResult: null,
};

const QuestionStats = ({
  questionStats,
}: {
  questionStats: IQuestionStatsForAllUsers | null;
}) => {
  const result: IQuestionResult = useMemo(
    () => getQuestionResult(questionStats),
    [questionStats],
  );

  return (
    <Box className="flex flex-col">
      {!questionStats ? (
        <PlugForEmptyData isSmall />
      ) : (
        <Box className="flex flex-row items-start justify-start gap-4">
          <QuestionStatsBar questionStats={questionStats} />

          <Box className="flex h-full flex-col items-start justify-start gap-2">
            <Box className="flex h-fit! h-full w-full flex-col justify-center gap-1">
              <Typography
                align="center"
                className="ms-4! w-fit! text-lg! font-semibold! uppercase"
              >
                Общие результаты
              </Typography>
              <QuestionStatsItem
                label="Всего попыток:"
                result={result.numberAttempts}
                defRes
                withoutPercent
              />

              <QuestionStatsItem
                label="
              Верный ответов:"
                result={result.correctAnswers}
                defRes
                withoutPercent
              />

              <QuestionStatsItem
                label="Средний результат:"
                result={result.averageResult}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const QuestionStatsMemo = memo(QuestionStats);

export { QuestionStatsMemo as QuestionStats };

const getQuestionResult = (
  questionStats: IQuestionStatsForAllUsers | null,
): IQuestionResult => {
  if (!questionStats || questionStats.results.length === 0) {
    return INIT_QUESTION_RESULTS;
  }

  let numberAttempts = 0;
  let correctAnswers = 0;

  questionStats.results.forEach((item) => {
    numberAttempts += item.numberAttempts;
    correctAnswers += item.correctAnswers;
  });

  return {
    numberAttempts,
    correctAnswers,
    averageResult: numberAttempts
      ? Math.round((correctAnswers / numberAttempts) * 100)
      : 0,
  };
};

const QuestionStatsItem = ({ label, result, ...props }: IQuestionStatsItemProps) => {
  return (
    <Box className="flex flex-row items-center gap-2">
      <Typography component="p" className="text-s! w-40 font-semibold!">
        {label}
      </Typography>

      <CustomAppChip result={result} {...props} />
    </Box>
  );
};

const QuestionStatsBar = ({
  questionStats,
}: {
  questionStats: IQuestionStatsForAllUsers;
}) => {
  const { labelLineOne, dataLineOne, labelLineTwo, dataLineTwo, xLabels } =
    preparingQuestionStatsForAllUsers({
      questionStats,
    });

  return (
    <Box className="flex grow flex-row">
      <CustomBar
        dataLineOne={dataLineOne}
        labelLineOne={labelLineOne}
        dataLineTwo={dataLineTwo}
        labelLineTwo={labelLineTwo}
        xLabels={xLabels}
        isEmpty={!questionStats.results.length}
        customTooltipType="questionStatsForAllUsersTooltip"
      />
    </Box>
  );
};
