import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { MuiThemeProvider, StoreProvider, ToastProvider } from '@/app/providers';
import { AppRouter } from '@/app/router/AppRouter';
import { queryClient } from './api';

function App() {
  return (
    <ToastProvider>
      <MuiThemeProvider>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <RouterProvider router={AppRouter} />
          </StoreProvider>
        </QueryClientProvider>
      </MuiThemeProvider>
    </ToastProvider>
  );
}

export default App;
