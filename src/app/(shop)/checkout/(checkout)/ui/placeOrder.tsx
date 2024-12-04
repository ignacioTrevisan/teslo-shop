"use client";

import { PlaceOrderToDataBase } from "@/actions/order/place-order";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { CurrencyFormatter } from "@/utils/currencyFormatter";
import { Sleep } from "@/utils/sleep";
import { Size } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const { address } = useAddressStore();
    const { getSummaryInformation, cart, clearClart } = useCartStore();
    const [summaryInformation, setSummaryInformation] = useState({
        subtotal: 0,
        tax: 0,
        total: 0,
        articlesQuantity: 0,
    });

    useEffect(() => {
        setLoaded(true)
        const resp = getSummaryInformation()
        setSummaryInformation(resp);
    }, [])

    const OnPlaceOrder = async () => {

        setErrorMessage('')
        const productsToOrder = cart.map(p => ({
            productId: p.id,
            quantity: p.quantity,
            size: p.size,
        })
        )
        setIsPlacingOrder(true);

        setIsPlacingOrder(false);
        const { id, ...rest } = address
        const resp = await PlaceOrderToDataBase(productsToOrder, rest);
        console.log(resp)
        if (!resp.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.msg);
            return;
        }

        router.replace('/orders/' + resp.order!.id)
    }

    if (!loaded) return (<p>Cargando...</p>)


    return (
        <div className='bg-white rounded-xl shadow-xl p-7'>

            <h2 className='text-2xl mb-2'>Direccion de entrega </h2>
            <div className='mb-10'>
                <p className='text-xl'>{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city} {address.country}</p>
                <p>{address.phone}</p>


            </div>

            {/* Dvidier */}

            <div className='w-full h-0.5 bg-gray-200 rounded mb-10' />
            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2'>
                <span>No. de productos</span>
                <span className='text-right'>{summaryInformation.articlesQuantity} artículos</span>

                <span>Subtotal</span>
                <span className='text-right'>{CurrencyFormatter(summaryInformation.subtotal)}</span>

                <span>Impuestos (15%)</span>
                <span className='text-right'>{CurrencyFormatter(summaryInformation.tax)}</span>

                <span className='mt-5 text-2xl'>Total: </span>
                <span className='mt-5 text-2xl text-right'>${summaryInformation.total}</span>

            </div>

            <p className='mb-5'>
                <span className='text-xs'>
                    Al hacer clic en "Colocar orden", aceptas nuestros <a href='#' className='underline'>terminos y condiciones </a>
                </span>
            </p>
            <div className='mt-5 mb-2 w-full'>
                {errorMessage !== '' && <p className="text-red-500">{errorMessage}</p>}
                <button
                    className={`flex ${isPlacingOrder ? 'btn-disabled' : 'btn-primary'} justify-center`}
                    onClick={() => OnPlaceOrder()}
                >
                    Colocar orden
                </button></div>

        </div>
    )
}
