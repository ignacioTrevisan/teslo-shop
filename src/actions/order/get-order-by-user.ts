'use server'
import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

export const GetOrderByUser = async () => {
    try {
        const session = await auth();
        if (!session) {
            throw Error('No se encontro la session del usuario')
        }
        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
            }, include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        if (!orders) {
            return {
                ok: true,
                orders: []
            }
        }
        return {
            ok: true,
            orders
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'Ocurrio un error, por favor vuelva a intarlo más tarde.',
            orders: []
        }
    }
}