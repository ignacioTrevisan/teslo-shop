'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const GetPaginatedUsers = async () => {
    const session = await auth();
    if (session?.user.role !== 'admin') {
        throw Error('No tiene permisos para realizar esta acción.')
    }
    try {
        const Users = await prisma.user.findMany({
            orderBy: {
                name: 'desc'
            }
        });

        return {
            ok: true,
            Users
        }
    } catch (error) {
        console.log({ error })
        return {
            ok: false
        }
    }
}