import React from 'react';
// import { Box } from '@mui/material';

// import { useAppSelector } from '@hooks/index';
// import { getGlobalField } from '@selectors/index';

import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { useLocation } from '@tanstack/react-router';

const MainPage = () => {
  // const title = useAppSelector(getGlobalField('title'));
  const location = useLocation();

  console.group('MainPage');
  console.log('location -', location.pathname);
  console.groupEnd();

  return (
    <SideFull id="MainPage" type="main">
      <SideSecond>
        <p>UserProfile</p>
        {/* <UserProfile user={user} userStats={userStats} /> */}
      </SideSecond>
      <SideMain>
        {/* <UserStats userStats={userStats} /> */}
        <p>UserStats</p>
      </SideMain>
    </SideFull>
  );
};

export default React.memo(MainPage);
