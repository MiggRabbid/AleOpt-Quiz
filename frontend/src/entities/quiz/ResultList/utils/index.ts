export const getAnswerBorder = (
  correctAnswerId: string,
  userAnswerId: string,
  answerId: string,
) => {
  const isCorrectAnswer = correctAnswerId === answerId;
  const isSelectAnswer = userAnswerId === answerId;
  if (isCorrectAnswer && isSelectAnswer) {
    return 'border-emerald-200! bg-emerald-100!';
  }
  if (!isCorrectAnswer && isSelectAnswer) {
    return 'border-rose-200! bg-rose-100!';
  }
  if (isCorrectAnswer) {
    return 'border-blue-200! bg-blue-100!';
  }
  return 'border-slate-200! bg-slate-100!';
};

export const getAnswerIdBg = (
  correctAnswerId: string,
  userAnswerId: string,
  answerId: string,
) => {
  const isCorrectAnswer = correctAnswerId === answerId;
  const isSelectAnswer = userAnswerId === answerId;
  if (isCorrectAnswer && isSelectAnswer) {
    return 'bg-emerald-300! text-emerald-800! ';
  }
  if (!isCorrectAnswer && isSelectAnswer) {
    return 'bg-rose-300! text-rose-800! ';
  }
  if (isCorrectAnswer) {
    return 'bg-blue-300! text-blue-800! ';
  }
  return 'bg-slate-300! text-slate-800! ';
};
