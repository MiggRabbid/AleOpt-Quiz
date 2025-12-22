import Typography from '@mui/material/Typography';
import clsx from 'clsx';

interface PlugProps {
  isSmall?: true;
}

const PlugForEmptyData = ({ isSmall }: PlugProps) => {
  const customClass = clsx(
    'm-4 text-center font-bold! text-slate-500! uppercase',
    isSmall ? 'text-md!' : 'w-full text-xl!',
  );

  return (
    <Typography align="center" component={isSmall ? 'p' : 'h4'} className={customClass}>
      Нет данных для отображения
    </Typography>
  );
};

export { PlugForEmptyData };
