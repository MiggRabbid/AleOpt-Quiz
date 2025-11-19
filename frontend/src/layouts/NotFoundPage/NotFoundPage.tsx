import { SideFull } from '@/shared/ui/layouts';
import ClientWrapper from './ui/NotFoundPageClientWrapper';

const NotFoundPageNotFoundPage = () => {
  return (
    <SideFull
      id="NotFoundPage"
      otherClass="relative flex h-full w-full items-center-safe justify-center-safe"
      type="login"
    >
      <div className="shadow-glass border-glass h-fit w-fit rounded-2xl border backdrop-blur-sm">
        <div className="bg-glass h-full min-h-34 w-full rounded-2xl">
          <ClientWrapper />
        </div>
      </div>
    </SideFull>
  );
};

export default NotFoundPageNotFoundPage;
