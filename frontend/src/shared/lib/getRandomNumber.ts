export const getRandomNumber = (max: number): number => {
  if (max <= 1) return 0;
  return Math.floor(Math.random() * max) + 1;
};
