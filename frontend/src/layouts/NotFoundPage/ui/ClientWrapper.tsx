'use client'
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box className="flex h-full w-full flex-col items-center-safe justify-center-safe gap-15 px-20 py-20">
      <Typography
        component="h1"
        className="w-full text-center text-3xl! font-bold! uppercase"
      >
        Страница не найдена
      </Typography>
      {children}
    </Box>
  );
};

export default ClientWrapper;
