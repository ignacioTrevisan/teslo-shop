"use client"

import { QuantitySelector } from "@/components/product"
import { useCartStore } from "@/store/cart/cart-store"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export const ProductsInCart = () => {
    const { cart, updateProductQuantity, removeProductCart } = useCartStore();
    useEffect(() => {
        if (cart.length === 0) {
            redirect('/empty')
        }
    }, [cart])

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
                        <Link
                            href={`/product/${p.slug}`}
                        >
                            <p className="hover::underline cursor-pointer">{p.title}</p>
                        </Link>
                        <p>{p.prize}</p>
                        <QuantitySelector quantity={p.quantity}
                            setQuantity={(v) => {
                                updateProductQuantity(v, p.slug, p.size)
                            }} />
                        <button className='underline mt-3' onClick={() => removeProductCart(p.slug, p.size)}>Remover</button>
                    </div>

                </div>
            )}
        </>
    )
}
