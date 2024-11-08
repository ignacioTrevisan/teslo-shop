import prisma from "@/lib/prisma"
import { ValidTypes } from "@/seed/seed";
import { Gender } from "@prisma/client";

interface Props {
    page?: number,
    take: number,
    gender?: Gender
}
export const getPaginatedProductsWithImages = async ({ page = 0, take = 12, gender }: Props) => {

    try {
        const [productsResponse, totalPage] = await Promise.all([
            prisma.producto.findMany({
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            Url: true
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    }

                },
                skip: page > 0 ? (page - 1) * take : 0,
                take: take,
                where: {
                    gender
                }
            }),
            Math.ceil(await prisma.producto.count({ where: { gender } }) / take)
        ])

        return {
            products: productsResponse.map((p) => ({ ...p, images: p.ProductImage.map(image => image.Url), type: p.category.name as ValidTypes })),
            currentPage: page,
            totalPage
        };
    } catch (error) {
        console.log(error)
        throw new Error('Ocurrio un error al intentar traer los productos');
    }
}