import CredentialsProvider from 'next-auth/providers/credentials';
import { SessionStrategy } from 'next-auth';
import { api } from '@/shared/api/api';
import { iResponseLogin } from '@/types/auth';
import { ICallbackJwtArgs, ICallbackSessionArgs } from '@/types/next-auth';

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
        // console.group('------------------------------ authorize');
        const response = await api.login({
          username: credentials?.username || '',
          password: credentials?.password || '',
        });

        // console.log('response -', response?.username, response?.role);
        // console.groupEnd();

        if (!response?.token) return null;

        return { ...response };
      },
    }),
  ],
  session: { strategy: 'jwt' as SessionStrategy, maxAge: 7 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }: ICallbackJwtArgs) {
      if (!user) return token;

      // console.group('callbacks jwt');
      // console.log('user     -', (user as iResponseLogin).username, user.id);
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

      // console.log('newToken -', newToken);
      // console.groupEnd();

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

        // console.group('callbacks session');
        // console.log('new session  -', newSession);
        // console.groupEnd();
        return newSession;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};
