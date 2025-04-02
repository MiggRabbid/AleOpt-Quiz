// библиотеки
import type { Metadata } from 'next';
// стили
import './styles/globals.css';
// компоненты
import { AppHeader } from '@/components/layouts/Header/AppHeader';
import { SessionProvider } from '@/providers';

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
      <body className="flex flex-col justify-start bg-green-50 text-slate-900">
        <SessionProvider>
          <AppHeader />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
