import React from 'react';

import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { AdminProfile } from '@/entities/admin';

const AdminPage = () => {
  return (
    <SideFull id="MainPage" type="main">
      <SideSecond>
        <AdminProfile />
      </SideSecond>
      <SideMain>{`<UserStats />`}</SideMain>
    </SideFull>
  );
};

export default React.memo(AdminPage);
