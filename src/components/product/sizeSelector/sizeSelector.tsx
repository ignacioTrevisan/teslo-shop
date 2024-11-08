import type { ValidSizes } from '@/interface'
import React from 'react'


interface Props {
    Sizes: ValidSizes[],
    SelectedSize: ValidSizes
}
export const SizeSelector = ({ Sizes, SelectedSize }: Props) => {
    return (
        <div className='my-5'>
            <h3 className='font-bold mb-4'>Tallas disponibles</h3>
            <div className='flex'>

                {Sizes.map((s) =>
                    <button key={s} className={`mx-2 hover:underline text-lg ${s === SelectedSize && 'underline'}`}
                    >
                        {s}
                    </button>

                )}
            </div>
        </div>
    )
}
