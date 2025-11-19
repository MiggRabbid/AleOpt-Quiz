import { BtnRedirect } from './BtnRedirect';

const ClientWrapper = () => {
  return (
    <div className="flex h-full w-full flex-col items-center-safe justify-center-safe gap-15 px-20 py-20">
      <h1 className="w-full text-center text-3xl! font-bold! uppercase">
        Страница не найдена
      </h1>
      <BtnRedirect />
    </div>
  );
};

export default ClientWrapper;
