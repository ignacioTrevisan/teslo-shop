
import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptsjs from 'bcryptjs';
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                console.log('No llega nunca acá')
                if (!parsedCredentials.success) return null;
                const { email, password } = parsedCredentials.data;
                console.log('hay cambiosssS????')
                console.log({ email, password })

                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
                if (!user) {
                    console.log('1')
                    return null;
                } else {
                    console.log('2')
                }
                if (!bcryptsjs.compareSync(password, user.password)) return null;
                const { password: contraseña, ...rest } = user;
                console.log('rest', rest)
                return rest;
            },
        }),
    ]
}

export const { signIn, signOut } = NextAuth(authConfig)