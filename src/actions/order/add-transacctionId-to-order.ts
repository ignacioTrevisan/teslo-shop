'use server'
import prisma from "@/lib/prisma";

export const AddTransacctionIdToOrder = async (id: string, newTrasacctionId: string) => {
    try {
        await prisma.order.update({
            where: { id }, // ID de la orden creada previamente
            data: { transactionId: newTrasacctionId }, // Actualizamos con el ID de PayPal
        });

        return {
            ok: true
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false
        }
    }
}