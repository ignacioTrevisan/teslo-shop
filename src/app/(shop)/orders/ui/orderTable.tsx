
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCardOutline } from 'react-icons/io5'
interface Props {
    order: {

        OrderAddress: {
            firstName: string;
            lastName: string;
        } | null;
        id: string;
        subtotal: number;
        tax: number;
        total: number;
        ItemsInOrder: number;
        isPaid: boolean;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        transactionId: string | null;
    }
}

export const OrderTable = ({ order }: Props) => {

    const getTextColor = () => (order.isPaid ? 'text-green-800' : 'text-red-700');
    const getCondition = () => (order.isPaid ? 'Pagada' : 'No pagada');

    return (

        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.split('-').at(-1)}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <IoCardOutline className={getTextColor()} />
                <span className={getTextColor()}>{getCondition()}</span>

            </td>
            <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href={`/orders/${order.id}`} className="hover:underline">
                    Ver orden
                </Link>
            </td>

        </tr>

    )
}
