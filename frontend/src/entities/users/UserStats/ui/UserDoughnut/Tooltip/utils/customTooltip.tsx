/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  iQuestionStatsForDoughnut,
  typeDoughnut,
} from '../../../../../../../types/iStats';

export const customTooltipTitle = (
  questionsStats: iQuestionStatsForDoughnut | null,
  context: any,
) => {
  if (!questionsStats) return 'Нет данных';
  const tooltipData = context[0];
  const questionId = tooltipData.label;
  const currentQuestion = questionsStats[questionId];
  return `${currentQuestion.question}`;
};

export const customTooltipLabel = (type: typeDoughnut, context: any) => {
  const text =
    type === typeDoughnut.easy ? 'Правильных ответов' : 'Неправильных ответов';
  return `${text}: ${context.formattedValue}`;
};

export const customTooltipFooter = (
  questionsStats: iQuestionStatsForDoughnut | null,
  context: any,
) => {
  if (!questionsStats) return 'Нет данных';
  const tooltipData = context[0];
  const questionId = tooltipData.label;
  const currentQuestion = questionsStats[questionId];
  return `Из ${currentQuestion.attemptCount} попыток`;
};
