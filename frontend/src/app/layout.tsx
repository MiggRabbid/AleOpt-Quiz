// библиотеки
import type { Metadata } from 'next';
// стили
import './styles/globals.css';
// компоненты
import { StoreProvider, SessionProvider, MuiThemeProvider } from '@/providers';
import { AppHeader } from '@/widgets/Header';
// Мета данные
export const metadata: Metadata = {
  title: 'АлёОпт',
  description: 'Ну что, любимый сотрудник, готов проверить свои знания?',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="flex flex-col justify-start text-slate-900">
        <SessionProvider>
          <AppHeader />
          <StoreProvider>
            <MuiThemeProvider>{children}</MuiThemeProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
