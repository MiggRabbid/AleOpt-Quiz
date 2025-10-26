// библиотеки
import type { Metadata } from 'next';
// стили
import './styles/globals.css';
import styles from './layout.module.css';
// компоненты
import { AppHeader } from '@/widgets/Header';
import { StoreProvider, SessionProvider } from '@/providers';
// Мета данные
export const metadata: Metadata = {
  title: 'АлёОпт',
  description: 'Ну что, любимый сотрудник. готов проверить свои знания?',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${styles.container} flex flex-col justify-start text-slate-900 bg-emerald-300`}>
        <SessionProvider>
          <AppHeader />
          <StoreProvider>{children}</StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
