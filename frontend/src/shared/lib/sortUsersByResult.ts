import { iResultEntry } from '@/types/staff';
import { iUserStats, iUserStatsLastTreeAttempt } from '@/types/stats';

interface ICurrResultsValue {
  attempt: number;
  sumResult: number;
}

const gerPercent = (a: number, b: number): number => (a / b) * 100;

const getCurResultValue = (args: {
  currResult: ICurrResultsValue;
  attemptResults: iResultEntry;
}): ICurrResultsValue => {
  const { currResult, attemptResults } = args;

  const percent = gerPercent(
    attemptResults.correctAnswers,
    attemptResults.answers.length,
  );

  const updateResult: ICurrResultsValue = {
    attempt: currResult.attempt + 1,
    sumResult: currResult.sumResult + percent,
  };

  return updateResult;
};

export const sortUsersByResult = (results: iUserStats[]): iUserStatsLastTreeAttempt[] => {
  if (results.length === 0) return [];

  const filteredResults = results.filter((result) => result.attempts.length > 0);
  const updatedResults: iUserStatsLastTreeAttempt[] = filteredResults.map((result) => {
    const oneTryFromEndByA = result.attempts.at(-1);
    const twoTryFromEndByA = result.attempts.at(-2);
    const treeTryFromEndByA = result.attempts.at(-3);

    const currResults: ICurrResultsValue = {
      attempt: 0,
      sumResult: 0,
    };

    if (oneTryFromEndByA) {
      const { attempt, sumResult } = getCurResultValue({
        currResult: currResults,
        attemptResults: oneTryFromEndByA,
      });
      currResults.attempt = attempt;
      currResults.sumResult = sumResult;
    }
    if (twoTryFromEndByA) {
      const { attempt, sumResult } = getCurResultValue({
        currResult: currResults,
        attemptResults: twoTryFromEndByA,
      });
      currResults.attempt = attempt;
      currResults.sumResult = sumResult;
    }
    if (treeTryFromEndByA) {
      const { attempt, sumResult } = getCurResultValue({
        currResult: currResults,
        attemptResults: treeTryFromEndByA,
      });
      currResults.attempt = attempt;
      currResults.sumResult = sumResult;
    }

    return {
      ...result,
      averageResultLastTree: Math.round(currResults.sumResult / currResults.attempt),
    };
  });

  const sortedResults = updatedResults.sort((a, b) => a.averageResult - b.averageResult);

  console.log('sortedResults -', sortedResults);
  return sortedResults;
};
