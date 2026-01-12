import { ThemeProvider } from '@mui/material/styles';

import { customThemeMUI } from '@/app/theme';

import type { FC, ReactNode } from 'react';

interface IMuiThemeProviderProps {
  children: ReactNode;
}

const MuiThemeProvider: FC<IMuiThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={customThemeMUI}>{children}</ThemeProvider>;
};

export { MuiThemeProvider };
