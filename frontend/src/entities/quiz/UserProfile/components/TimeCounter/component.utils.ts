interface iTimeProps {
  currTime: number;
  maxTime: number;
}
export const getBGAndBorderColor = ({ currTime, maxTime }: iTimeProps) => {
  const percent = (currTime / maxTime) * 100;
  if (percent < 20) return 'text-rose-800! bg-rose-100 border-rose-200';
  if (percent < 50) return 'text-orange-800! bg-orange-100  border-orange-200';
  return 'text-emerald-800! bg-emerald-100  border-emerald-200';
};
export const getCircularColor = ({
  currTime,
  maxTime,
}: iTimeProps): 'success' | 'error' | 'warning' => {
  const percent = (currTime / maxTime) * 100;
  if (percent < 20) return 'error';
  if (percent < 50) return 'warning';
  return 'success';
};
