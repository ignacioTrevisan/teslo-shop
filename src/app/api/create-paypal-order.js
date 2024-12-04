// pages/api/create-paypal-order.js

import { paypalClient } from "@/lib/paypal"; // Asegúrate de configurar tu cliente de PayPal

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { cart, totalAmount, userId } = req.body;

            // Crear la orden de PayPal
            const order = {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: totalAmount.toString(),
                    },
                    description: 'Compra de productos',
                }],
            };

            const paypalOrder = await paypalClient.createOrder(order); // Aquí, paypalClient es tu cliente de PayPal configurado
            const paypalOrderId = paypalOrder.id;

            // Retornar el ID de la orden de PayPal
            res.status(200).json({ paypalOrderId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la orden de PayPal' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
