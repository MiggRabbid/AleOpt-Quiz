// Библиотеки
import React from 'react';
import { useLocation } from '@tanstack/react-router';
// Компоненты
import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { UserProfile } from '@/entities/users';
import UserStats from '@/entities/users/UsersStats';

const MainPage = () => {
  return (
    <SideFull id="MainPage" type="main">
      <SideSecond>
        <UserProfile />
      </SideSecond>
      <SideMain>
        <UserStats />
      </SideMain>
    </SideFull>
  );
};

export default React.memo(MainPage);
