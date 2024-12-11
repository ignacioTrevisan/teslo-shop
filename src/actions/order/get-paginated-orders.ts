'use server'
import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

export const GetPaginatedOrders = async () => {
    try {
        const session = await auth();
        if (session?.user.role !== 'admin') {
            throw Error('Esta acción solo es posible para los administradores')
        }
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
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