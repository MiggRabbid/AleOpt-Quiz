import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '../../api';
import { ICallbackJwtArgs, ICallbackSessionArgs } from '@/types/next-auth';

const handler = NextAuth({
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
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }: ICallbackJwtArgs) {
      console.group('------------------------------ callbacks jwt');
      console.log('token    -', token);
      if (!user) {
        console.groupEnd();
        return token;
      }

      const newToken = { ...token, ...user };
      console.log('newToken -', newToken);
      return newToken;
    },
    async session({ session, token }: ICallbackSessionArgs) {
      console.group('------------------------------ callbacks session');
      console.log('token      -', token);
      console.log('session    -', session);
      if (token && session.user) {
        const newSession = { ...session, user: { ...session.user } };
        console.log('newSession -', newSession);
        return newSession;
      }
      console.groupEnd();
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
