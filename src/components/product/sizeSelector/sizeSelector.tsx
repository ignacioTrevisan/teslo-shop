import type { ValidSizes } from '@/interface'
import { Size } from '@prisma/client'
import React from 'react'


interface Props {
    Sizes: ValidSizes[],
    SelectedSize?: ValidSizes,
    onSizeChanged: (size: Size) => void;
}
export const SizeSelector = ({ Sizes, SelectedSize, onSizeChanged }: Props) => {
    return (
        <div className='my-5'>
            <h3 className='font-bold mb-4'>Tallas disponibles</h3>
            <div className='flex'>

                {Sizes.map((s) =>

                    <button key={s} className={`mx-2 hover:underline text-lg ${s === SelectedSize && 'underline'}`}
                        onClick={() => onSizeChanged(s)}
                    >
                        {s}
                    </button>

                )}
            </div>
        </div>
    )
}
