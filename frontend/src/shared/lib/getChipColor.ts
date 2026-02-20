import { RESULTS_STEPS } from '@/app/core/config';

export const getChipColor = (result: number | null | undefined) => {
  if (!result && result !== 0) {
    return 'bg-slate-400!';
  }
  if (result >= RESULTS_STEPS.middle) {
    return 'bg-emerald-400!';
  }
  if (result <= RESULTS_STEPS.low) {
    return 'bg-rose-400!';
  }
  return 'bg-orange-400!';
};

export const getIconColorForStyles = (result: number | null | undefined) => {
  if (!result && result !== 0) {
    return 'oklch(70.4% 0.04 256.788)';
  }
  if (result >= RESULTS_STEPS.middle) {
    return 'oklch(76.5% 0.177 163.223)';
  }
  if (result <= RESULTS_STEPS.low) {
    return 'oklch(71.2% 0.194 13.428)';
  }
  return 'oklch(75% 0.183 55.934)';
};
