import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

import { UserRoles } from './types/staff.types';
import { routes, TRoutesValues } from './shared/config/routes';

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    console.log('------------------- withAuth middleware');

    const token = req.nextauth.token?.token as string;
    const role = req.nextauth.token?.role as UserRoles;
    const pathname = req.nextUrl.pathname as unknown as TRoutesValues;

    console.log('----------');
    console.log('url      -', req.url);
    console.log('nextUrl  -', pathname);
    console.log('role     -', role);
    console.log('token    -', token);
    console.log('----------');

    if ((!role || !token) && pathname !== routes.login) {
      console.log('IF 1 / (!role || !token) && pathname !== routes.login');
      console.log('-------------------');
      return NextResponse.redirect(new URL(routes.login, req.url));
    }

    const userRedirect = redirects[role];
    console.log('userRedirect  -', userRedirect);

    if (userRedirect && userRedirect.from.includes(pathname)) {
      console.log('IF 2 / userRedirect && userRedirect.from.includes(pathname)');
      console.log('-------------------');
      return NextResponse.redirect(new URL(userRedirect.to, req.url));
    }

    console.log('ELSE');
    console.log('-------------------');
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = (req as NextRequestWithAuth).nextUrl.pathname;

        console.log('------------------- callbacks authorized');
        console.log('pathname -', pathname);
        console.log('token exists -', !!token);
        console.log('-------------------');

        if (pathname === routes.login) return true;

        return !!token;
      },
    },
  },
);

const redirects: Record<UserRoles, { from: TRoutesValues[]; to: string }> = {
  [UserRoles.Employee]: {
    from: [routes.main, routes.admin, routes.login],
    to: routes.profile,
  },
  [UserRoles.Admin]: {
    from: [routes.main, routes.login],
    to: routes.admin,
  },
  [UserRoles.Owner]: {
    from: [routes.main, routes.login],
    to: routes.admin,
  },
};

export const config: TConfigType = {
  matcher: ['/profile', '/quiz', '/admin'],
};

type TConfigType = {
  matcher: Array<TRoutesValues>;
};
