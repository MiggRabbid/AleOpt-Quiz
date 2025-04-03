import NextAuth from 'next-auth';
import type { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '../../api';
import { ICallbackJwtArgs, ICallbackSessionArgs } from '@/types/next-auth';
import { iResponseLogin } from '@/types/auth';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.group('------------------------------ authorize');
        const response = await api.login({
          username: credentials?.username || '',
          password: credentials?.password || '',
        });

        if (response?.token) {
          return { ...response, id: response.username };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' as SessionStrategy, maxAge: 7 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }: ICallbackJwtArgs) {
      if (!user) {
        return token;
      }

      console.log('jwt user -', user);
      const {
        firstName,
        role,
        image,
        token: userToken,
        id,
        username,
      } = user as iResponseLogin;

      const newToken = {
        ...token,
        email: 'null',
        name: firstName,
        token: userToken,
        role,
        image,
        id,
        username,
      };
      return newToken;
    },
    async session({ session, token }: ICallbackSessionArgs) {
      if (token && session.user) {
        const newSession = {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            username: token.username,
            name: token.name,
            token: token.token,
            image: token.image,
            email: 'null',
          },
        };
        return newSession;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
