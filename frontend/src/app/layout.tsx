import type { Metadata } from 'next';
import './styles/globals.css';
import './styles/tailwindcss.css';
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
      <body className="flex flex-col justify-start text-slate-900 bg-green-50">
        <SessionProvider>
          <AppHeader />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
