// Библиотеки
import React from 'react';
// Компоненты
import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { UserStats, UserProfile } from '@/entities/users';

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
