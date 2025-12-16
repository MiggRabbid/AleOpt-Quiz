// Библиотеки
import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router';
// Логика
import { routes } from '@app/router';
// Компоненты
import { AppLayout } from '@/shared/layouts';
import {
  MainPage,
  LoginPage,
  QuizPage,
  AdminPage,
  NotFoundPage,
  ErrorPage,
} from '@/pages';
import { PrivateRoute } from './';

// Корень
const rootRoute = createRootRoute({
  component: () => (
    <PrivateRoute>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </PrivateRoute>
  ),
  errorComponent: () => <ErrorPage />,
  notFoundComponent: () => <NotFoundPage />,
});

// Логин
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.login,
  component: () => <LoginPage />,
});

// Главная
const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.main,
  component: () => <MainPage />,
});

// Квиз
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.quiz,
  component: () => <QuizPage />,
});

// Админка
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.admin,
  component: () => <AdminPage />,
});

const routeTree = rootRoute.addChildren({
  loginRoute,
  mainRoute,
  quizRoute,
  adminRoute,
});

export const AppRouter = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof AppRouter;
  }
}
