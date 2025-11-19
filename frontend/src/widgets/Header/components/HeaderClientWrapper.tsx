// Типизация
import { HeaderClientWrapperProps } from './header.types';

const HeaderClientWrapper = ({
  BtnLogo,
  BtnLogout,
  BtnRedirect,
}: HeaderClientWrapperProps) => {
  return (
    <div className="bg-glass h-full w-full rounded-2xl px-3.5 py-2">
      <div className="flex h-full w-full flex-row items-center justify-between">
        <div className="flex max-w-25 min-w-30 items-center justify-center border-none">
          {BtnLogo}
        </div>
        <div className="flex items-center justify-end gap-4">
          {BtnRedirect}
          {BtnLogout}
        </div>
      </div>
    </div>
  );
};

export { HeaderClientWrapper };
