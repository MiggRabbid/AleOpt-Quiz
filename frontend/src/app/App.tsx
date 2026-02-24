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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <MuiThemeProvider>
            <StoreProvider>
              <RouterProvider router={AppRouter} />
            </StoreProvider>
          </MuiThemeProvider>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
