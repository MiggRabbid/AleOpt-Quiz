import React from 'react';
import { Box, Typography } from '@mui/material';
import type { ErrorComponentProps } from '@tanstack/react-router';

const ErrorPage = ({ error }: ErrorComponentProps) => {
  const isInstanceofError = error instanceof Error;

  console.group('GlobalError:');
  console.error(error);
  console.groupEnd();

  return (
    <Box className="min-h-full w-full p-10!">
      <Typography component={'h1'} className="text-center text-3xl font-bold">
        Что-то пошло не так
      </Typography>

      {isInstanceofError ? (
        <Typography component={'pre'} className="text-md text-center font-bold">
          {error.message}
        </Typography>
      ) : (
        <Typography component={'p'} className="text-md text-center font-bold">
          Неизвестная ошибка
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(ErrorPage);
