import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

interface PlugProps {
  isSmall?: true;
  isLoading?: boolean;
}

const PlugForEmptyData = ({ isSmall, isLoading = false }: PlugProps) => {
  const customClass = clsx(
    'm-4 text-center font-bold! text-slate-500! uppercase',
    isSmall ? 'text-md!' : 'w-full text-xl!',
  );

  if (isLoading) {
    return (
      <CircularProgress
        color="success"
        className="mx-auto h-20! min-h-20! w-20! min-w-20!"
      />
    );
  }

  return (
    <Typography align="center" component={isSmall ? 'p' : 'h4'} className={customClass}>
      Нет данных для отображения
    </Typography>
  );
};

export { PlugForEmptyData };
