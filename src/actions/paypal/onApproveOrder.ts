'use server'
import { PaypalCheckoutResponse } from "@/interface/paypal.responses";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


interface Props {
    transactionId: string,
    orderId: string
}
export const OnApproveOrder = async ({ transactionId, orderId }: Props): Promise<{ ok: boolean, respuesta?: PaypalCheckoutResponse }> => {
    try {
        console.log({ transactionId })
        const accessToken = await getAccessToken();
        const response = await fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${transactionId}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const respuesta: PaypalCheckoutResponse = await response.json();
        console.log({ respuesta })
        if (respuesta.status === 'COMPLETED') {
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    isPaid: true,
                    paidAt: new Date()
                }
            })
        } else {
            return {
                ok: false
            }
        }
        revalidatePath(`orders/${orderId}`)
        return { ok: true, respuesta }

    } catch (error) {
        console.log(error)
        return {
            ok: false
        }
    }

}

const getAccessToken = async () => {
    const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.NEXT_PUBLIC_PAYPAL_PUBLIC_ID}:${process.env.NEXT_PUBLIC_PAYPAL_SECRET_ID}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache", // Asegura que no use caché
        },
        body: "grant_type=client_credentials",
        cache: "no-store", // Configuración adicional para evitar caché
    });

    const data = await response.json();

    if (!data.access_token) {
        throw new Error("Error obteniendo el token de acceso");
    }

    return data.access_token; // Este es tu ACCESS_TOKEN
};
