// https://tailwindcomponents.com/component/hoverable-table
import { GetOrderByUser } from '@/actions/order/get-order-by-user';
import { Title } from '@/components';

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {
    const orders = await GetOrderByUser();
    return (
        <>
            <Title title="Orders" />

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>

                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre completo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Estado
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(orders.ok && orders.orders.length > 0) ? orders.orders.map((o) =>


                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{o.id.split('-').at(-1)}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {o.OrderAddress?.firstName} {o.OrderAddress?.lastName}
                                </td>
                                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                    <IoCardOutline className={`${o.isPaid ? 'text-green-800' : 'text-red-700'}`} />
                                    <span className={`mx-2 ${o.isPaid ? 'text-green-800' : 'text-red-700'}`}>{o.isPaid ? 'Pagada' : 'No pagada'}</span>

                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 ">
                                    <Link href={`/orders/${o.id}`} className="hover:underline">
                                        Ver orden
                                    </Link>
                                </td>

                            </tr>
                        )
                            :
                            <h3>No se encontraron ordenes</h3>

                        }

                    </tbody>
                </table>
            </div >
        </>
    );
}