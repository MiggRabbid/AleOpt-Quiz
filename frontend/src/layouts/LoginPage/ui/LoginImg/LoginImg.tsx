import Image from 'next/image';

const LoginImg = () => {
  return (
    <div
      className="shadow-glass border-glass relative col-span-2 max-h-[1080px]! w-full max-w-6xl! rounded-2xl border backdrop-blur-sm"
      style={{
        height: '100%',
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
  );
};

export { LoginImg };
