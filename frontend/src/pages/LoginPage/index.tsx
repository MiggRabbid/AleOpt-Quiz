import { memo } from 'react';

import { SideFull } from '@/shared/layouts';
import { LoginForm } from '@/features/LoginForm';
import { LoginImg } from './components/';

const LoginPage = () => {
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

export default memo(LoginPage);
