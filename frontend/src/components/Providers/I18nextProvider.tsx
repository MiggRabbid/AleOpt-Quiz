import { ReactNode } from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import resources from '../../locales/index';

const DEFAULT_LNG = 'ru'

const I18nProvider = ({ children }: { children: ReactNode }) => {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance.use(initReactI18next)
    .init({
      resources,
      lng: DEFAULT_LNG,
      interpolation: {
        escapeValue: false,
      },
      debug: true,
    });

  return (
    <I18nextProvider i18n={i18nextInstance}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;