import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main() {

    await Promise.all([
        prisma.user.deleteMany(),
        prisma.productImage.deleteMany(),
        prisma.category.deleteMany(),
        prisma.producto.deleteMany(),
    ])


    const { categories, products, users } = initialData


    const userData = users.map((u) => { return u });
    await prisma.user.createMany({ data: userData })

    const categoriesData = categories.map((name) => ({ name }))

    await prisma.category.createMany({ data: categoriesData })


    const categoryDb = await prisma.category.findMany({})

    const categoryMap = categoryDb.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>)

    products.forEach(async (product) => {

        const { type, images, ...rest } = product
        const dbProduct = await prisma.producto.create({
            data: {
                ...rest,
                categoryId: categoryMap[type]
            }
        })
        const imageData = images.map((i) => ({
            Url: i,
            ProductId: dbProduct.id
        }))
        imageData.map(async (i) => {
            await prisma.productImage.create({
                data: { ...i }
            })
        })
    })



}
(() => {
    main();
})();