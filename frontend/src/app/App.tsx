import { RouterProvider } from '@tanstack/react-router';

import { MuiThemeProvider, StoreProvider } from '@/app/providers';
import { AppRouter } from '@/app/router/AppRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api';

function App() {
  return (
    <MuiThemeProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <RouterProvider router={AppRouter} />
        </StoreProvider>
      </QueryClientProvider>
    </MuiThemeProvider>
  );
}

export default App;
