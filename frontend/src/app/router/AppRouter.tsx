import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router';

import { AppLayout } from '@/layouts';
import {
  MainPage,
  LoginPage,
  QuizPage,
  AdminPage,
  NotFoundPage,
  ErrorPage,
} from '@/pages';
import { routes } from '@/app/router/routes';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  errorComponent: ErrorPage,
});

// Главная
const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.main,
  component: MainPage,
});

// Логин
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.login,
  component: LoginPage,
});

// Квиз
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.quiz,
  component: QuizPage,
});

// Админка
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.admin,
  component: AdminPage,
});

// 404
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  mainRoute,
  quizRoute,
  adminRoute,
  notFoundRoute,
]);

export const AppRouter = createRouter({ routeTree });

