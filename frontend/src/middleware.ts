import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const role = req.nextauth.token?.role;
    const pathname = req.nextUrl.pathname;
    if (!role) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (pathname === '/admin' && role === 'Employee') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (pathname === '/login' && role === 'Employee') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (pathname === '/login' && role === 'Admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    if (pathname === '/login' && role === 'Owner') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ['/', '/quiz', '/admin', '/:path((?!api|_next|.*\..*).*)'],
};
