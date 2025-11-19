// Библиотеки
import Image from 'next/image';
import Link from 'next/link';
// Компоненты
import { routes } from '@/shared/config/routes';

const BtnLogo = () => {
  return (
    <Link
      href={routes.profile}
      className="inline-flex items-center justify-center"
      aria-label="На страницу профиля"
    >
      <Image
        src="/assets/images/logo.png"
        alt="АлёОпт - лучший магазин аксессуаров"
        width={142}
        height={50}
        draggable={false}
        className="pointer-events-none! select-none!"
      />
    </Link>
  );
};

export { BtnLogo };
