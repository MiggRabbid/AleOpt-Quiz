export const routes = {
  login: '/login',
  main: '/',
  quiz: '/quiz',
  admin: '/admin',
} as const;

export type TRoutesKeys = keyof typeof routes;
export type TRoutesValues = (typeof routes)[TRoutesKeys];
