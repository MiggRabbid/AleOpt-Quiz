// Компоненты
import { BtnLogo, BtnRedirect, BtnLogout, HeaderClientWrapper } from './components';

const AppHeader = async () => {
  return (
    <header className="shadow-glass border-glass mx-4 mt-2 flex h-15 shrink-0 grow-0 flex-row items-center justify-between rounded-2xl border backdrop-blur-sm">
      <HeaderClientWrapper
        BtnLogo={<BtnLogo />}
        BtnRedirect={<BtnRedirect />}
        BtnLogout={<BtnLogout />}
      />
    </header>
  );
};

export { AppHeader };
