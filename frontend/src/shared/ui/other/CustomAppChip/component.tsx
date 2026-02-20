import { RESULTS_STEPS } from '@/app/core/config';
import { getChipColor } from '@/shared/lib';
import { Chip } from '@mui/material';

export interface ICustomAppChipProps {
  result?: number | null;
  maxRes?: true;
  defRes?: true;
  withoutPercent?: true;
}

export const CustomAppChip = ({
  result,
  maxRes,
  defRes,
  withoutPercent,
}: ICustomAppChipProps) => {
  return (
    <Chip
      label={!result && result !== 0 ? '-' : withoutPercent ? result : `${result}%`}
      className={`w-17! text-base! font-bold! text-neutral-50! ${getChipColor(defRes ? null : maxRes ? RESULTS_STEPS.max : result)}`}
      variant="filled"
    />
  );
};
