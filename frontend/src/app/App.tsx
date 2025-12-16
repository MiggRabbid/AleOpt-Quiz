import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import {
  MuiThemeProvider,
  StoreProvider,
  ToastProvider,
  AuthProvider,
} from '@app/providers';
import { AppRouter } from '@app/router';
import { queryClient } from '@app/api';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MuiThemeProvider>
          <QueryClientProvider client={queryClient}>
            <StoreProvider>
              <RouterProvider router={AppRouter} />
            </StoreProvider>
          </QueryClientProvider>
        </MuiThemeProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
