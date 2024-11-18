"use client"
import { GetStockBySlug } from '@/actions/products/get-stock-by-slug'
import { titleFont } from '@/config/fonts'
import prisma from '@/lib/prisma'
import React, { useEffect, useState } from 'react'

interface Props {
    slug: string
}
export const StockLabel = ({ slug }: Props) => {
    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        getValue()
    }, [])
    const getValue = async () => {
        setIsLoading(true);
        const resp = await GetStockBySlug(slug);
        setValue(resp.inStock);
        setIsLoading(false)
    }

    return (
        <>
            {isLoading
                ?
                <h1 className={`${titleFont.className} antialiased font-bold bg-gray-200 animate-pulse text-xl`}>
                    &nbsp
                </h1>
                :
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    Stock:  {value}
                </h1>
            }
        </>
    )
}
