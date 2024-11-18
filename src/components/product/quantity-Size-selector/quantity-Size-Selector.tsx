import React from 'react'
import { SizeSelector } from '../sizeSelector'
import { QuantitySelector } from '../quantitySelector'
import { Product } from '@/interface'

interface Props {
    product: Product;
}
export const QuantitySizeSelector = ({ product }: Props) => {
    return (
        <>
            {/* Selector de tallas */}
            < SizeSelector Sizes={product.sizes} SelectedSize={product.sizes[0]} />
            {/* Selector de cantidad */}
            < QuantitySelector quantity={2} />

            {/* Boton */}

            < button className='btn-primary my-5' > Agregar al carrito</button >
        </>
    )
}
