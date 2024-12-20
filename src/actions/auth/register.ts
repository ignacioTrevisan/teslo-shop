"use server"
import prisma from "@/lib/prisma"
import bcryptsjs from 'bcryptjs';

export const RegisterUser = async (name: string, email: string, password: string) => {
    try {

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcryptsjs.hashSync(password, 10),
            },
            select: {
                id: true,
                name: true,
                image: true,
                email: true
            }

        })

        return {
            ok: true,
            user
        };
    } catch (error) {
        console.log(error);
        return { ok: false }
    }
}