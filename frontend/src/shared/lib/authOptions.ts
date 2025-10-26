import CredentialsProvider from 'next-auth/providers/credentials';
import { SessionStrategy } from 'next-auth';
import { api } from '@/shared/api';
import { iResponseLogin } from '@/types/auth.types';
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
        console.group('authorize start');
        try {
          const response = await api.login({
            username: credentials?.username || '',
            password: credentials?.password || '',
          });

          console.log(response);
          if (!response?.token) return null;
          return { ...response };
        } catch (error) {
          console.log(error);
          console.error('authorize error /', error);
          return null;
        } finally {
          console.groupEnd();
        }
      },
    }),
  ],
  session: { strategy: 'jwt' as SessionStrategy, maxAge: 7 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }: ICallbackJwtArgs) {
      if (!user) return token;

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
