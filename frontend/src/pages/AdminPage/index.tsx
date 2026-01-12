import React from 'react';

import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { AdminProfile } from '@/entities/admin';
import { CustomCardWrapper } from '@/shared/ui';
import { Box, Typography } from '@mui/material';

const AdminPage = () => {
  return (
    <SideFull id="MainPage" type="main">
      <SideSecond>
        <AdminProfile />
      </SideSecond>
      <SideMain>
        <CustomCardWrapper roundedSize="rounded-xl">
          <Box className="flex h-fit w-full items-center justify-center bg-slate-50 p-10">
            <Typography
              variant="h5"
              component="h5"
              fontWeight="bold"
              className="text-center font-serif text-gray-700 uppercase"
            >
              Модуль находится в разработке
            </Typography>
          </Box>
        </CustomCardWrapper>
      </SideMain>
    </SideFull>
  );
};

export default React.memo(AdminPage);
