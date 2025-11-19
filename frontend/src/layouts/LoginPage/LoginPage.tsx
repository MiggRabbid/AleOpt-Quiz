import { LoginForm } from './ui/LoginForm/LoginForm';
import { LoginImg } from './ui/LoginImg/LoginImg';
import { SideFull } from '@/shared/ui/layouts/SideFull/SideFull';

const LoginPage = async () => {
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

export default LoginPage;
