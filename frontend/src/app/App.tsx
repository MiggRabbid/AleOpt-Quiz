import { RouterProvider } from '@tanstack/react-router';

import { MuiThemeProvider, StoreProvider } from '@/app/providers';
import { AppRouter } from '@/app/router/AppRouter';

function App() {
  return (
    <MuiThemeProvider>
      <StoreProvider>
        <RouterProvider router={AppRouter} />
      </StoreProvider>
    </MuiThemeProvider>
  );
}

export default App;
