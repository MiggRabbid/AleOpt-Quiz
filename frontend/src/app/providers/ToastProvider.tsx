import { SnackbarProvider } from 'notistack';

import type { FC, ReactElement } from 'react';
import type { SnackbarOrigin } from 'notistack';

export interface ProviderToastProps {
  children: ReactElement;
}

const snackbarAnchorOrigin: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

export const ToastProvider: FC<ProviderToastProps> = ({ children }) => {
  return (
    <SnackbarProvider
      style={{ maxWidth: 320 }}
      anchorOrigin={snackbarAnchorOrigin}
      maxSnack={3}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
};
