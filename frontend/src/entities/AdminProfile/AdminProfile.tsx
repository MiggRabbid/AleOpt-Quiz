// Библиотеки
import React from 'react';
// Компоненты
import AdminProfileClientWrapper from './AdminProfileClientWrapper';
// Типизация
import { IAdminProfileProps } from './AdminProfile.types';

const AdminProfile = (props: IAdminProfileProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-start gap-5.5" id="AdminProfile">
      <AdminProfileClientWrapper {...props} />
    </div>
  );
};

export default AdminProfile;
