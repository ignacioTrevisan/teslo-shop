'use server'

import prisma from "@/lib/prisma"
import { Gender, Producto, Size } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { object, z } from "zod"
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'nachotrevisan',
    api_key: '843785223879488',
    api_secret: 'cvzlO0itKd4m6CHKAmq6Sl9QYcw' // Click 'View API Keys' above to copy your API secret
});



const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string(),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    categoryId: z.string().uuid(),
    sizes: z.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.nativeEnum(Gender)
})

export const AddUpdateProducts = async (form: FormData) => {

    try {


        const data = Object.fromEntries(form);
        const productParsed = productSchema.safeParse(data);
        if (!productParsed.success) {
            console.log(productParsed.error)
            return {
                ok: false
            }
        }
        const product = productParsed.data;
        product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();
        const { id, ...rest } = product;
        const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());
        const prismaTx = await prisma.$transaction(async (tx) => {
            let product: Producto;
            if (id) {
                product = await prisma.producto.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: tagsArray
                    }
                })

            } else {
                product = await prisma.producto.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: tagsArray
                    }
                })
            }

            revalidatePath(`/admin/products/`)
            revalidatePath(`/admin/products/${product.slug}`)
            revalidatePath(`/products/${product.slug}`)
            if (form.getAll('images')) {
                const images = await uploadImages(form.getAll('images') as File[])
                if (!images) {
                    throw Error('No se pudo cargar las imagenes')
                }
                await prisma.productImage.createMany({
                    data: images.map(image => ({
                        Url: image!,
                        ProductId: product.id
                    }))
                })
            }
        })
        return {
            product,
            ok: true
        }
    } catch (error) {
        console.log(error)
        return {

            ok: false
        }
    }
}

const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer()
                const base64Image = Buffer.from(buffer).toString('base64');
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: 'teslo-shop' }).then((r) => r.secure_url);

            } catch (error) {
                console.log(error)
                return null
            }
        })
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.log(error)
        return null;
    }
}
