import type { AppRouter } from './AppRouter';

declare module '@tanstack/react-router' {
  // eslint-disable-next-line no-unused-vars
  interface Register {
    router: typeof AppRouter;
  }
}
