import NextAuth, { Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { authMocks } from '@mocks/authMock';

declare module 'next-auth' {
    interface User {
        id?: string;
        name?: string | null;
        email?: string | null;
        role?: string;
    }

    interface Session {
        user: User;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                const user = authMocks.find((user) => user.email === email && user.password === password);

                if (!user) throw new Error('Invalid credentials');

                return user;
            }
        })
    ],
    trustHost: true,
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            if (user) {
                token.id = user.id;
                (token.name = user.name), (token.email = user.email), (token.role = user.role);
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                (session.user.id = token.id as string), (session.user.name = token.name);
                session.user.email = token.email;
                session.user.role = token.role as string;
            }
            return session;
        }
    }
});
