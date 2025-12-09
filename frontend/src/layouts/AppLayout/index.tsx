// Библиотеки
import React, { type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
// Компоненты
import { AppHeader } from '@/widgets/AppHeader';

interface IAppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  return (
    <Box className="w-full flex flex-col justify-start text-slate-900">
      <AppHeader />
      {children}
    </Box>
  );
};

export default React.memo(AppLayout);
