// Библиотеки
import React from 'react';
import { useLocation } from '@tanstack/react-router';
// Компоненты
import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { UserProfile } from '@/entities/users';

const MainPage = () => {
  const location = useLocation();

  console.group('MainPage');
  console.log('location -', location.pathname);
  console.groupEnd();

  return (
    <SideFull id="MainPage" type="main">
      <SideSecond>
        <UserProfile />
      </SideSecond>
      <SideMain>
        {/* <UserStats userStats={userStats} /> */}
        <p>UserStats</p>
      </SideMain>
    </SideFull>
  );
};

export default React.memo(MainPage);
