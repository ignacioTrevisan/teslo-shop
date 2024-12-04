'use server';

import prisma from "@/lib/prisma";
import { GetProductBySlug } from "../products/get-product-by-slug";
import { auth } from "@/auth.config";

export const GetOrderData = async (id: string) => {
    const user = await auth();

    try {
        const orderData = await prisma.order.findFirst({
            where: {
                id
            },
        })

        if (orderData?.userId !== user?.user.id && user?.user.role !== 'admin') {

            return {
                ok: false
            }
        }
        const OrderItems = await prisma.orderItems.findMany({
            where: {
                orderId: id
            },
            include: {
                product: true
            }
        })

        const productImage = await Promise.all(
            OrderItems.map(async (o) => {

                return prisma.productImage.findFirst({ where: { ProductId: o.productId } })
            })
        );

        const address = await prisma.orderAddress.findFirst({
            where: {
                orderId: orderData?.id
            },
            include: {
                country: {
                    select: { name: true }
                }
            }
        })


        return {
            orderData: orderData,
            productImage: productImage,
            OrderItems: OrderItems,
            address,
            ok: true,
        }
    } catch (error) {
        console.log({ error })
        return {
            ok: false
        }
    }
}