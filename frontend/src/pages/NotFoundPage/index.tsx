import { memo } from 'react';
import { Box, Typography } from '@mui/material';

import { SideFull } from '@/shared/layouts';
import { BtnRedirect } from '@/widgets/AppHeader/components';

const NotFoundPage = () => {
  return (
    <SideFull
      id="NotFoundPage"
      otherClass="relative flex h-full w-full items-center-safe justify-center-safe"
      type="login"
    >
      <Box className="shadow-glass border-glass h-fit w-fit rounded-2xl border backdrop-blur-sm">
        <Box className="bg-glass h-full min-h-34 w-full rounded-2xl">
          <Box className="flex h-full w-full flex-col items-center-safe justify-center-safe gap-15 px-20 py-20">
            <Typography
              component={'h1'}
              className="w-full text-center text-3xl! font-bold! uppercase"
            >
              Страница не найдена
            </Typography>
            <BtnRedirect />
          </Box>
        </Box>
      </Box>
    </SideFull>
  );
};

export default memo(NotFoundPage);
