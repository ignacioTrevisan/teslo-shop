// https://tailwindcomponents.com/component/hoverable-table
import { GetOrderByUser } from '@/actions/order/get-order-by-user';
import { Title } from '@/components';
import { OrderTable } from './ui/orderTable';

export default async function OrdersPage() {
    const orders = await GetOrderByUser();

    if (!orders.orders) {
        return (<p>Cargando ordenes...</p>)
    }
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
                        {orders.orders.map((o) =>
                            <OrderTable order={o} />
                        )
                        }

                    </tbody>
                </table>
            </div >
        </>
    );
}