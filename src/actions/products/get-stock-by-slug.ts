"use server";

import prisma from "@/lib/prisma";


export const GetStockBySlug = async (slug: string) => {
    try {
        const producto = await prisma.producto.findFirst({
            where: { slug },
            select: { inStock: true }

        }
        )
        if (!producto) {
            throw new Error('No se pudo encontrar este producto');
        } else {
            const { ...rest } = producto;
            return {
                ...rest,
            }
        }
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo encontrar este producto');
    }
}