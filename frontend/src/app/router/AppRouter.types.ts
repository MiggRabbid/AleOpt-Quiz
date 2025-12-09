import type { AppRouter } from './AppRouter';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof AppRouter;
  }
}
