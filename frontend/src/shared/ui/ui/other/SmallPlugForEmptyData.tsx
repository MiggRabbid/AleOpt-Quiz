import { Typography } from '@mui/material';

const SmallPlugForEmptyData = () => {
  return (
    <Typography
      align="center"
      component="p"
      className="text-md! m-4! font-bold! text-slate-300 uppercase!"
    >
      Нет данных для отображения
    </Typography>
  );
};

export { SmallPlugForEmptyData };
