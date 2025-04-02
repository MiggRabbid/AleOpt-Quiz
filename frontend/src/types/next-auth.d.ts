/* eslint-disable no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as JwtNExtAuth } from 'next-auth/jwt';
import type { User as nextAuthUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: iResponseLogin & Omit<DefaultSession['user'], 'email'>;
  }

  interface User extends iResponseLogin {}
}

declare module 'next-auth/jwt' {
  interface JWT extends iResponseLogin {}
}

export interface IAuthorizedArgs {
  token: JwtNExtAuth | null;
}

export interface ICallbackJwtArgs {
  token: JwtNExtAuth;
  user?: nextAuthUser;
}

export interface ICallbackSessionArgs {
  session: Session;
  token: JwtNExtAuth;
}
