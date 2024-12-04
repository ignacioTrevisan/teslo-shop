import { ProductInCart, ProductInOrder } from '@/interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CurrencyFormatter } from '../../../../../utils/currencyFormatter';
interface Props {
    product: ProductInOrder[]
}
export const ProductsInOrder = ({ product }: Props) => {
    return (
        <>
            {product.map((p) =>
                <div key={`${p.size}`} className='flex mb-5'>
                    <Image
                        src={`/products/${p.image}`}
                        width={100}
                        height={100}
                        alt={p.title}
                        className='mr-5 rounded'
                        style={{ width: '100px', height: '100px' }}
                    />

                    <div>

                        <p className="hover::underline cursor-pointer">{p.title} - {p.size}</p>

                        <p> {CurrencyFormatter(p.prize)} x {p.quantity}</p>
                        <p>Subtotal: {CurrencyFormatter(p.prize * p.quantity)}</p>
                    </div>

                </div>
            )}
        </>
    )
}
