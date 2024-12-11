'use server'

import prisma from "@/lib/prisma"

export const GetCategories = async (slug?: string) => {
    const productCategory = await prisma.producto.findFirst({
        where: { slug: slug },
        select: {
            category: true
        }
    })
    const availableCategories = await prisma.category.findMany({})
    return { productCategory, availableCategories }
}