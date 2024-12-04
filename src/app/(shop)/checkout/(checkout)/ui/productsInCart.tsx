"use client"

import { useCartStore } from "@/store/cart/cart-store"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { CurrencyFormatter } from '../../../../../utils/currencyFormatter';

export const ProductsInCart = () => {
    const { cart } = useCartStore();
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setLoaded(true)
    }, [])

    if (cart.length === 0 && loaded === true) {
        redirect('/empty')
    }
    return (
        <>
            {cart.map((p) =>
                <div key={`${p.slug} - ${p.size}`} className='flex mb-5'>
                    <Image
                        src={`/products/${p.image}`}
                        width={100}
                        height={100}
                        alt={p.slug}
                        className='mr-5 rounded'
                        style={{ width: '100px', height: '100px' }}
                    />

                    <div>
                        <span

                        >
                            {p.title} - {p.size} ({p.quantity})
                        </span>
                        <p className="font-bold">{CurrencyFormatter(p.prize * p.quantity)}</p>

                    </div>

                </div>
            )}
        </>
    )
}
