import NextAuth, { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            emailVerified?: boolean,
            role: 'admin' | 'user',
        } & DefaultSession['user']
    }
}