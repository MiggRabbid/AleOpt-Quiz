import React from 'react';

import { SideFull } from '@/shared/layouts';
import { LoginForm } from '@/features/LoginForm';
import { LoginImg } from './components/';
import { useLocation } from '@tanstack/react-router';

const LoginPage = () => {
  const location = useLocation();
  console.group('LoginPage');
  console.log('location -', location.pathname);
  console.groupEnd();

  return (
    <SideFull
      id="LoginPage"
      otherClass="relative h-full w-full grid-cols-3 grid-flow-col justify-items-center"
      type="login"
    >
      <LoginForm />
      <LoginImg />
    </SideFull>
  );
};

export default React.memo(LoginPage);
