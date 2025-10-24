import { LoginForm } from './ui/LoginForm/LoginForm';
import { LoginImg } from './ui/LoginImg/LoginImg';
import { SideFull } from '@/shared/ui/layouts/SideFull/SideFull';

export default function LoginPage() {
  return (
    <SideFull
      mx={1}
      my={1}
      gap={20}
      otherClass="relative grid h-full w-full grow grid-cols-3 items-center-safe justify-start p-20"
      id="LoginPage"
    >
      <LoginForm />
      <LoginImg />
    </SideFull>
  );
}
