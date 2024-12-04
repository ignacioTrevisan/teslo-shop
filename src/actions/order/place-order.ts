'use server'

import { UserAddress } from '../../interface/UserAddress';
import { auth } from "@/auth.config";
import { ValidSizes } from "@/interface";
import prisma from '@/lib/prisma';
import { TbX } from 'react-icons/tb';

interface ProductToOrderProp {
    productId: string,
    quantity: number,
    size: ValidSizes,
}

//Se llama PlaceOrderToDataBase y no PlaceOrder por que casualmente el nombre PlaceOrder choca con el nombre de la page.tsx

export const PlaceOrderToDataBase = async (productsInCart: ProductToOrderProp[], address: UserAddress) => {
    try {
        const user = await auth();
        const userId = user?.user.id;
        if (!userId) {
            return {
                ok: false,
                msg: 'No se pudo obtener el id del usuario. '
            }
        }
        const products = await prisma.producto.findMany({
            where: {
                id: {
                    in: productsInCart.map((p) => p.productId)
                }
            }
        })
        const itemsInOrder = productsInCart.reduce((count, p) => count + p.quantity, 0);

        const { subTotal, tax, total } = productsInCart.reduce((totals, items) => {
            const product = products.find((p) => p.id === items.productId);
            if (!product) return totals;


            const subTotalItem = product.price * items.quantity;
            const taxItem = subTotalItem * 0.15;
            const totalItem = subTotalItem + taxItem;
            return {
                subTotal: subTotalItem + totals.subTotal,
                tax: taxItem + totals.tax,
                total: totalItem + totals.total,
            }
        }, { subTotal: 0, tax: 0, total: 0 })

        //Transacción

        const prismaTx = await prisma.$transaction(async (tx) => {
            const updatedProducts = await Promise.all(
                products.map(async (p) => {
                    const quantityProduct = productsInCart.filter((pr) => pr.productId === p.id)
                        .reduce((acc, item) => item.quantity + acc, 0);

                    const resp = await tx.producto.update({
                        where: { id: p.id },
                        data: { inStock: { decrement: quantityProduct } },
                    });

                    if (resp.inStock < 0) {
                        console.log(`No hay suficiente stock de ${p.title} para llevar. El stock: ${p.inStock} y usted está queriendo llevar ${quantityProduct}`)
                        throw Error(`No hay suficiente stock de ${p.title} para llevar. `)
                    }
                })
            );

            const order = await tx.order.create({
                data: {
                    userId: userId,
                    isPaid: false,
                    subtotal: subTotal,
                    total: total,
                    tax: tax,
                    ItemsInOrder: itemsInOrder,
                },
            });

            const items = await tx.orderItems.createMany({
                data: productsInCart.map((p) => ({
                    orderId: order.id,
                    productId: p.productId,
                    quantity: p.quantity,
                    price: products.find((pr) => pr.id === p.productId)!.price,
                    size: p.size,
                })),
            });



            const { country, ...rest } = address;

            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...rest,
                    orderId: order.id,
                    countryId: address.country,
                },
            });

            return { order, items, orderAddress };
        });

        return {
            ok: true,
            orderAddress: prismaTx.orderAddress,
            items: prismaTx.items,
            order: prismaTx.order
        }

    } catch (error: any) {
        console.log(error);
        return {
            ok: false,
            msg: error?.message,
        }
    }
}