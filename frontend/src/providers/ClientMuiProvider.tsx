'use client';
// Библиотеки
import React, { ReactNode } from 'react';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// Стили
import { customThemeMUI } from '@/theme';

const muiCache = createCache({ key: 'mui', prepend: true });

interface ClientMuiProviderProps {
  children: ReactNode;
}

const ClientMuiProvider = ({ children }: ClientMuiProviderProps) => (
  <CacheProvider value={muiCache}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customThemeMUI}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  </CacheProvider>
);

export { ClientMuiProvider };
