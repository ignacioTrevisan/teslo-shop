"use client"

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number,
    setQuantity: (quantity: number) => void;
}
export const QuantitySelector = ({ quantity, setQuantity }: Props) => {

    const addProduct = () => {
        if (quantity > 4) return;
        setQuantity(quantity + 1);
    }
    const RemoveProduct = () => {
        if (quantity < 2) return;
        setQuantity(quantity - 1);
    }
    return (
        <div className="flex">
            <button onClick={() => RemoveProduct()} className={`${quantity < 2 ? 'hover:cursor-no-drop' : 'hover:cursor-pointer'}`}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{quantity.toString()}</span>
            <button onClick={() => addProduct()} className={`${quantity > 4 ? 'hover:cursor-no-drop' : 'hover:cursor-pointer'}`}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
