"use client"
import { useCartStore } from '@/store/cart/cart-store'
import { CurrencyFormatter } from '@/utils/currencyFormatter';
import Link from 'next/link'
import { useEffect, useState } from 'react';


export const Summary = () => {
    const { getSummaryInformation, cart } = useCartStore();
    const [summaryInformation, setSummaryInformation] = useState({
        subtotal: 0,
        tax: 0,
        total: 0,
        articlesQuantity: 0,
    });
    useEffect(() => {
        const resp = getSummaryInformation()
        setSummaryInformation(resp);
    }, [cart])

    return (
        <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
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


            <div className='mt-5 mb-2 w-full'><Link href={'/checkout/address'} className='flex btn-primary justify-center'>
                Checkout
            </Link></div>

        </div>
    )
}
