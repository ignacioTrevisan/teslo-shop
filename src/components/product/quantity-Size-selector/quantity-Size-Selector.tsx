"use client";
import { SizeSelector } from '../sizeSelector'
import { QuantitySelector } from '../quantitySelector'
import { Product, ProductInCart } from '@/interface'
import { useState } from 'react';
import { Size } from '@prisma/client';
import { useCartStore } from '@/store/cart/cart-store';

interface Props {
    product: Product;
}
export const QuantitySizeSelector = ({ product }: Props) => {


    const addProductToCart = useCartStore(state => state.addProductToCart);
    const [Size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState(false)
    const addToCart = () => {
        setPosted(true);
        if (!Size) return;
        const cartProduct: ProductInCart = {
            id: product.id,
            slug: product.slug,
            image: product.images[0],
            size: Size,
            title: product.title,
            quantity: quantity,
            prize: product.price,
        }
        addProductToCart(cartProduct);
        setPosted(false)
        setQuantity(1);
        setSize(undefined);
    }
    return (
        <>
            {/* Selector de tallas */}
            {
                posted === true && Size === undefined &&
                <span className='mt-2 text-red-500'>Debe seleccionar una talla*</span>
            }

            < SizeSelector Sizes={product.sizes} SelectedSize={Size} onSizeChanged={setSize} />
            {/* Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
            />

            {/* Boton */}

            < button className='btn-primary my-5' onClick={addToCart} > Agregar al carrito</button >
        </>
    )
}
