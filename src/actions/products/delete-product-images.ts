'use server'
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config({
    cloud_name: 'nachotrevisan',
    api_key: '843785223879488',
    api_secret: 'cvzlO0itKd4m6CHKAmq6Sl9QYcw' // Click 'View API Keys' above to copy your API secret
});
export const DeleteProductImages = async (id: string, url: string) => {
    try {

        if (!url.startsWith('http')) {

            throw Error('No se pueden eliminar productos del FS')
        }
        console.log({ url })
        const imageName = `teslo-shop/${url
            .split('/')
            .pop()
            ?.split('.')[0]}`
        console.log({ imageName })
        try {
            const resp = await cloudinary.uploader.destroy(imageName);
            const productId = await prisma.productImage.findFirst({ where: { id: +id } });
            const product = await prisma.producto.findFirst({ where: { id: productId?.ProductId } })
            const deleted = await prisma.productImage.deleteMany({
                where: { id: +id }
            })
            console.log({ resp })

            revalidatePath(`/admin/products/${product?.slug}`)
            return {
                ok: true,
                msg: 'Imagen eliminada correctamente.'
            }
        } catch (error) {
            throw Error('No se pudo eliminar la imagen, por favor intentelo nuevamente más tarde')
        }


    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: 'No se pudo eliminar la imagen, por favor intentelo nuevamente más tarde'
        }
    }
}