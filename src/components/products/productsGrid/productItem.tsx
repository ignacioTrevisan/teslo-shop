"use client"
import { Product } from '@/interface'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    product: Product
}
export const ProductItem = ({ product }: Props) => {
    const [displayImage, setDisplayImage] = useState(0)

    return (
        <div className="rounded-md overflow-hidden fade-in" onMouseEnter={() => setDisplayImage(1)} onMouseLeave={() => setDisplayImage(0)}>
            <Image
                src={`/products/${product.images[displayImage]}`}
                alt={product.title}
                className='w-full object-cover rounded'
                width={500}
                height={500}
            />
            <div className='p-4 flex flex-col'>
                <Link
                    href={`/product/${product.slug}`} className="hover:text-blue-500" >
                    {product.title}
                </Link>
                <span className='font-bold'>${product.price}</span>
            </div>
        </div >
    )
}
