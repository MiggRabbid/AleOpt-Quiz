'use client';

import { SessionProvider } from 'next-auth/react';

interface IStoreProviderProps {
  children: React.ReactNode;
}

function Providers({ children }: IStoreProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
