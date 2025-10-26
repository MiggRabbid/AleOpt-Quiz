import { LoginForm } from './ui/LoginForm/LoginForm';
import { LoginImg } from './ui/LoginImg/LoginImg';
import { SideFull } from '@/shared/ui/layouts/SideFull/SideFull';

export default function LoginPage() {
  return (
    <SideFull
      id="LoginPage"
      otherClass="relative grid h-full w-full grow grid-cols-3 items-center-safe justify-center-safe"
      type="login"
    >
      <LoginForm />
      <LoginImg />
    </SideFull>
  );
}
