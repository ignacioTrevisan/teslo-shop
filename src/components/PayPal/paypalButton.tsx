"use client"
import { CreateOrder } from "@/actions/paypal/createOrder";
import { OnApproveOrder } from "@/actions/paypal/onApproveOrder";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

interface OrderData {
    id: string;
    details?: Array<{
        issue: string;
        description: string;
    }>;
    debug_id?: string;
}
interface Props {
    orderId: string,
    totalToPay: string,
}

export const PayPalButton = ({ orderId, totalToPay }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer()
    if (isPending) {
        return (
            <div className="animate-pulse mb-16">
                <div className="h-11 bg-gray-300 rounded"></div>
                <div className="h-11 bg-gray-300 rounded mt-2"></div>
            </div>
        )
    }

    return (
        <div className=" relative z-0">

            <PayPalButtons
                createOrder={async () => {

                    const resp = await CreateOrder({ amount: totalToPay, idOrder: orderId })
                    if (!resp.ok) {
                        throw Error('No se pudo crear la orden');
                    }
                    return resp.resp!.id;
                }}
                onApprove={async (data) => {
                    console.log("Aprobando orden con ID:", data.orderID); // Verifica que el orderID sea correcto

                    const resp = await OnApproveOrder({ transactionId: data.orderID, orderId: orderId })
                    if (resp.ok) {
                        console.log('orden aprobada y pagada.')
                    }
                }}
                onError={(err) => {
                    console.error("Error en el flujo de PayPal:", err);
                }}
            />
        </div>


    )
}
