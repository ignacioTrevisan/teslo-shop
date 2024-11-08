"use client"

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number
}
export const QuantitySelector = ({ quantity }: Props) => {

    const [counter, setCounter] = useState(quantity)
    const addProduct = () => {
        if (counter > 4) return;
        setCounter(counter + 1);
    }
    const RemoveProduct = () => {
        if (counter < 2) return;
        setCounter(counter - 1);
    }
    return (
        <div className="flex">
            <button onClick={() => RemoveProduct()} className={`${counter < 2 ? 'hover:cursor-no-drop' : 'hover:cursor-pointer'}`}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{counter.toString()}</span>
            <button onClick={() => addProduct()} className={`${counter > 4 ? 'hover:cursor-no-drop' : 'hover:cursor-pointer'}`}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
