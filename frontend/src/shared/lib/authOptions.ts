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
        if (!credentials?.password || !credentials?.username) {
          return null;
        }

        try {
          const response = await api.login(credentials);

          if (!response || !response?.token) {
            console.log('NEXT / CredentialsProvider / authorize / without token');
            return null;
          }
          return { ...response };
        } catch (error) {
          console.error('NEXT / authorize error /', error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' as SessionStrategy, maxAge: 7 * 24 * 60 * 60 },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  callbacks: {
    async jwt({ token, user }: ICallbackJwtArgs) {
      console.log('---------- NEXT / jwt /', token, user);
      console.log('user  -', user);
      console.log('-------');
      console.log('token -', token);
      console.log('-----------------------');
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
