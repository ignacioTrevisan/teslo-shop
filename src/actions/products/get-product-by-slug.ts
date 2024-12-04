"use server";

import { Product, ValidTypes } from "@/interface";
import prisma from "@/lib/prisma";



export const GetProductBySlug = async (slug: string): Promise<Product> => {
    try {
        const producto = await prisma.producto.findFirst({
            where: { slug },
            include: {
                ProductImage: {
                    select: {
                        Url: true
                    }
                },
                category: {
                    select: {
                        name: true // Esto nos da el "type" desde Category
                    }
                }
            }
        }
        )
        if (!producto) {
            throw new Error('No se pudo encontrar este producto');
        } else {
            const { ...rest } = producto;

            return {
                ...rest,
                type: producto.category.name as ValidTypes,
                images: producto.ProductImage.map(image => image.Url)
            }
        }
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo encontrar este producto');
    }
}