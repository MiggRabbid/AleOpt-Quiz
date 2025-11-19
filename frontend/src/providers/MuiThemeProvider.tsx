import { ReactNode } from 'react';
import { ClientMuiProvider } from './ClientMuiProvider';

interface MuiThemeProviderProps {
  children: ReactNode;
}

const MuiThemeProvider = ({ children }: MuiThemeProviderProps) => {
  return <ClientMuiProvider>{children}</ClientMuiProvider>;
};

export default MuiThemeProvider;
