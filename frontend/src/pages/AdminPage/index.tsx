import React from 'react';
import { SideFull, SideMain, SideSecond } from '@/shared/layouts';
import { AdminProfile } from '@/entities/admin';
import { useQuery } from '@tanstack/react-query';
import { useGetAllUsersStats } from '@/app/api/hooks';
import { useAuthContext } from '@/app/hooks';

const AdminPage = () => {
  const { isAuth, user } = useAuthContext();

  const { data: userData } = useQuery({
    ...useGetAllUsersStats(),
    enabled: isAuth && !!user?.username,
  });

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
