import 'react-i18next';
import ru from './app/locales/ru';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ru';
    resources: {
      ru: typeof ru;
    };
  }
}
