import { SideFull } from '@/shared/ui/layouts';
import Image from 'next/image';

const MainPage = async () => {
  return (
    <SideFull
      id="MainPage"
      otherClass="relative h-full w-full grid-cols-2 grid-flow-col justify-items-center"
      type="login"
    >
      <div
        className="shadow-glass border-glass relative col-span-2 h-full max-h-[1080px]! w-full max-w-6xl! rounded-2xl border backdrop-blur-sm"
        style={{
          overflow: 'hidden',
        }}
      >
        <div
          className="bg-glass flex h-full w-full items-center justify-center"
          style={{
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <div className="relative h-full w-full rounded-xl">
            <Image
              className="object-cover"
              src="/assets/images/login-img.jpg"
              alt="АлёОпт Квиз"
              fill
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SideFull>
  );
};

export default MainPage;
