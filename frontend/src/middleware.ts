import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

import { IAuthorizedArgs } from './types/next-auth';
import { UserRoles } from './types/staff.types';
import { routes } from './shared/config/routes';

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const role = req.nextauth.token?.role as UserRoles;
    const pathname = req.nextUrl.pathname;

    if (!role || !token) {
      return NextResponse.redirect(new URL(routes.login, req.url));
    }

    const redirects: Record<UserRoles, { from: string[]; to: string }> = {
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

    const userRedirect = redirects[role];

    if (userRedirect && userRedirect.from.includes(pathname)) {
      return NextResponse.redirect(new URL(userRedirect.to, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }: IAuthorizedArgs) => {
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ['/profile', '/quiz', '/admin', '/:path((?!api|_next|.*\..*).*)'],
};
