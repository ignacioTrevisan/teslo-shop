'use server'
import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

export const AlterRole = async (id: string, newRole: 'admin' | 'user') => {
    try {
        const session = await auth();
        if (session?.user.role !== 'admin') {
            throw Error('No tiene permisos para realizar esta acción.');
        }
        await prisma.user.update({
            where: { id },
            data: {
                role: newRole
            }
        })
        return {
            ok: true,
            newRole
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false
        }
    }
}