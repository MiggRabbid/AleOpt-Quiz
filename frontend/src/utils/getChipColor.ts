export const getChipColor = (result: number) => {
  if (result >= 66) {
    return 'bg-emerald-400!';
  }
  if (result <= 50) {
    return 'bg-rose-400!';
  }
  return 'bg-orange-400!';
};