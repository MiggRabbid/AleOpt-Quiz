import { iUserStats } from '@/app/types/stats.types';

const gerPercent = (a: number, b: number): number => (a / b) * 100;

export const sortUsersByResult = (results: iUserStats[]): iUserStats[] => {
  if (results.length === 0) return [];

  const filteredResults = results.filter((result) => result.attempts.length > 0);

  const sortedResults = filteredResults.sort((a, b) => {
    const lastResultA = gerPercent(
      a.attempts[0].correctAnswers,
      a.attempts[0].answers.length,
    );
    const lastResultB = gerPercent(
      b.attempts[0].correctAnswers,
      b.attempts[0].answers.length,
    );
    return lastResultA - lastResultB;
  });
  return sortedResults;
};