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
    if (pathname === routes.admin && role === UserRoles.Employee) {
      return NextResponse.redirect(new URL(routes.main, req.url));
    }
    if (pathname === routes.login && role === UserRoles.Employee) {
      return NextResponse.redirect(new URL(routes.main, req.url));
    }
    if (pathname === routes.login && role === UserRoles.Admin) {
      return NextResponse.redirect(new URL(routes.admin, req.url));
    }
    if (pathname === routes.login && role === UserRoles.Owner) {
      return NextResponse.redirect(new URL(routes.admin, req.url));
    }
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
  matcher: ['/', '/quiz', '/admin', '/:path((?!api|_next|.*\..*).*)'],
};
