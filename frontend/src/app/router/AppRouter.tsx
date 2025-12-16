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
import { PrivateOutlet } from './';
import { AppLayout } from '@/shared/layouts';
import {
  MainPage,
  LoginPage,
  QuizPage,
  AdminPage,
  NotFoundPage,
  ErrorPage,
} from '@/pages';

// Корень
const rootRoute = createRootRoute({
  component: () => (
    <PrivateOutlet>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </PrivateOutlet>
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
