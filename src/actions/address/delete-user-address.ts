'use server';

import prisma from "@/lib/prisma";

export const DeleteUserAddress = async (userId: string) => {
    try {
        const address = await prisma.userAddress.delete({ where: { userId } })
        if (!address) return {
            ok: false
        };
        return {
            ok: true,

        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'No se pudo eliminar la dirección. ',
        }
    }
}