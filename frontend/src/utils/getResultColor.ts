export const getResultColor = (
  result: number | null | undefined,
  prefix: 'bg' | 'text',
  colorIntensity: number,
) => {
  if (!result) return 'bg-slate-400!';
  if (result >= 66) {
    return `${prefix}-emerald-${colorIntensity}!`;
  }
  if (result <= 50) {
    return `${prefix}-rose-${colorIntensity}!`;
  }
  return `${prefix}-orange-${colorIntensity}!`;
};