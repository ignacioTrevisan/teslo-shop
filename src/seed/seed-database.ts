import { initialData } from "./seed";
import { countries } from './seed.countries';
import prisma from '../lib/prisma';

async function main() {

    await prisma.orderAddress.deleteMany();
    await prisma.orderItems.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();


    await prisma.producto.deleteMany();
    await prisma.category.deleteMany();
    await prisma.country.deleteMany();


    const { categories, products, users } = initialData

    countries.map(async (c) => {
        await prisma.country.create({
            data: {
                id: c.id,
                name: c.name
            }
        })
    })


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