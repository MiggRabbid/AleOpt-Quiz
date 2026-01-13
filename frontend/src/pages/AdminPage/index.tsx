import { memo } from 'react';

import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { AdminProfile, AdminStats } from '@/entities/admin';

const AdminPage = () => {
  return (
    <SideFull id="MainPage" type="main">
      <SideSecond>
        <AdminProfile />
      </SideSecond>
      <SideMain>
        <AdminStats />
      </SideMain>
    </SideFull>
  );
};

export default memo(AdminPage);
