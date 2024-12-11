"use server";

import { Product, ValidTypes } from "@/interface";
import prisma from "@/lib/prisma";



export const GetProductBySlug = async (slug: string) => {
    try {
        const producto = await prisma.producto.findFirst({
            where: { slug },
            include: {
                ProductImage: true,
                category: {
                    select: {
                        name: true // Esto nos da el "type" desde Category
                    }
                }
            }
        }
        )
        if (!producto) {

            return {
                ok: false
            }

        } else {
            const { ...rest } = producto;

            return {
                ok: true,
                product: {

                    ...rest,
                    type: producto.category.name as ValidTypes,
                    images: producto.ProductImage.map(image => image.Url)
                }
            }
        }
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo encontrar este producto');
    }
}