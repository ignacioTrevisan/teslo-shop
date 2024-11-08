import { Product } from '@/interface'
import React from 'react'
import { ProductItem } from './productItem'

interface Props {
    products: Product[]
}
export const ProductGrid = ({ products }: Props) => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10'>
            {products.map((p) => (
                <ProductItem product={p} key={p.title} />
            ))}
        </div>
    )
}
