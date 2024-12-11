"use client"

import { PayPalButton } from "@/components/PayPal/paypalButton";
import { UserAddress } from "@/interface/UserAddress";
import { CurrencyFormatter } from "@/utils/currencyFormatter";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
interface Props {
    orderId: string,
    userAddress: UserAddress
    ProductQuantity: number,
    Subtotal: number,
    Tax: number,
    Total: number,
    isPayed: boolean
}
export const OrderCheckoutInfo = ({ userAddress, ProductQuantity, Subtotal, Tax, Total, isPayed, orderId }: Props) => {

    return (
        <div className='bg-white rounded-xl shadow-xl p-7'>

            <h2 className='text-2xl mb-2'>Direccion de entrega </h2>
            <div className='mb-10'>
                <p className='text-xl'>{userAddress.firstName} {userAddress.lastName}</p>
                <p>{userAddress.address}</p>
                <p>{userAddress.address2}</p>
                <p>{userAddress.postalCode}</p>
                <p>{userAddress.city} {userAddress.country}</p>
                <p>{userAddress.phone}</p>


            </div>

            {/* Dvidier */}

            <div className='w-full h-0.5 bg-gray-200 rounded mb-10' />
            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2'>
                <span>No. de productos</span>
                <span className='text-right'>{ProductQuantity.toString()} artículos</span>

                <span>Subtotal</span>
                <span className='text-right'>{CurrencyFormatter(Subtotal)}</span>

                <span>Impuestos (15%)</span>
                <span className='text-right'>{CurrencyFormatter(Tax)}</span>

                <span className='mt-5 text-2xl'>Total: </span>
                <span className='mt-5 text-2xl text-right'>${Total}</span>

            </div>

            <p className='mb-5'>
                <span className='text-xs'>
                    Al hacer clic en "Colocar orden", aceptas nuestros <a href='#' className='underline'>terminos y condiciones </a>
                </span>
            </p>
            {!isPayed ?
                <div className='mt-5 mb-2 w-full'>
                    <PayPalButton orderId={orderId} totalToPay={Total.toString()} />
                </div>
                :
                <div className={
                    clsx(
                        "flex items-center h-10 rounded-lg py-2 px-3.5 text-xs font-bold text-green mb-5 bg-green-700",

                    )
                } >

                    <IoCardOutline />

                    <span className="mx-2 text-1xl">Pagada</span>

                </div>
            }

        </div>
    )
}
