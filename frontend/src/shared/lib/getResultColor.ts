import { RESULTS_STEPS } from '@/app/core/config';

export const getResultColor = (
  result: number | null | undefined,
  prefix: 'bg' | 'text',
  colorIntensity: number,
) => {
  if (!result) return 'bg-slate-400!';
  if (result >= RESULTS_STEPS.middle) {
    return `${prefix}-emerald-${colorIntensity}!`;
  }
  if (result <= RESULTS_STEPS.low) {
    return `${prefix}-rose-${colorIntensity}!`;
  }
  return `${prefix}-orange-${colorIntensity}!`;
};
