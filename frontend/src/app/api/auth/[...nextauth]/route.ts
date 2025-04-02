import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '../../api';

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
    async jwt({ token, user }) {
      console.group('------------------------------ callbacks jwt');
      const newToken = { ...token };
      if (user && 'role' in user) {
        newToken.role = (user as any).role;
        newToken.name = (user as any).username;
        newToken.username = (user as any).username;
        newToken.token = (user as any).token;
        // eslint-disable-next-line no-underscore-dangle
        newToken.id = (user as any).username;
        newToken.email = '';
        newToken.picture = '';
      }
      console.log('user     -', user);
      console.log('token    -', token);
      console.log('newToken -', newToken);
      console.groupEnd();
      return newToken;
    },
    async session({ session, token }) {
      console.group('------------------------------ callbacks session');
      const newSession = { ...session };
      if (token && session.user) {
        (newSession.user as any).role = token.role;
        (newSession.user as any).name = token.username;
        (newSession.user as any).username = token.username;
        (newSession.user as any).id = token.username;
        (newSession.user as any).token = token.token;
        (newSession.user as any).email = '';
        (newSession.user as any).image = '';
      }
      console.log('token      -', token);
      console.log('session    -', session);
      console.log('newSession -', newSession);
      console.groupEnd();
      return newSession;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
