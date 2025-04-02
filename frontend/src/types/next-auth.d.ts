/* eslint-disable no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { User as nextAuthUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: iResponseLogin & DefaultSession['user'];
  }

  interface User extends iResponseLogin {}
}

declare module 'next-auth/jwt' {
  interface JWT extends iResponseLogin {}
}

export interface IAuthorizedArgs {
  token: JWT | null;
}

export interface ICallbackJwtArgs {
  token: JWT;
  user?: nextAuthUser;
}

export interface ICallbackSessionArgs {
  session: Session;
  token: JWT;
}
