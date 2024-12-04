


import { Title } from "@/components";
import { PlaceOrder } from "../../checkout/(checkout)/ui/placeOrder";
import { ProductsInOrder } from './ui/productsInOrder';
import { GetOrderData } from "@/actions/order/get-order-data";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { OrderCheckoutInfo } from "./ui/OrderCheckoutInfo";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function OrdersWithIdPage({ params }: Props) {

    const id = (await params).id;

    const { OrderItems, orderData, productImage, ok, address } = await GetOrderData(id);

    if (!ok) {
        return (<p>No tiene permiso para ver este producto.</p>)
    }
    if (!OrderItems) { return }
    const itemsMapped = OrderItems.map((i) => ({
        id: i.productId,
        title: i.product.title,
        image: productImage.find((f) => f!.ProductId === i.product.id)!.Url,
        size: OrderItems.find((f) => f.productId === i.product.id)!.size,
        quantity: OrderItems.find((f) => f.productId === i.product.id)!.quantity,
        prize: i.price,
    }))
    const addressMapped = {
        firstName: address!.firstName,
        lastName: address!.lastName,
        address: address!.address,
        address2: address?.address2 ?? undefined,
        postalCode: address!.postalCode,
        city: address!.city,
        country: address!.country.name,
        phone: address!.phone,
    }
    const itemsInOrder = itemsMapped.reduce((count, p) => count + p.quantity, 0);
    return (
        <>
            <h1 className=''>Order #{id.split('-').at(-1)}</h1>

            <div className='flex justify-center items-center mb-72 px-10 sm:px-0 '>
                <div className='flex flex-col w-[1000px]'>
                    <Title title='Verificar orden' />
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

                        {/* Carrito */}

                        <div className='flex flex-col mt-5'>
                            <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-green mb-5",
                                    {
                                        'bg-red-500': !orderData?.isPaid,
                                        'bg-green-700': orderData?.isPaid
                                    }
                                )
                            } >

                                <IoCardOutline />
                                {orderData?.isPaid ?
                                    <span className="mx-2">Pagada</span>
                                    :

                                    <span className="mx-2">No pagada</span>
                                }
                            </div>




                            {itemsMapped && <ProductsInOrder product={itemsMapped} />}



                        </div>
                        {/* Checkout */}

                        <OrderCheckoutInfo
                            userAddress={addressMapped}
                            Total={orderData!.total}
                            Subtotal={orderData!.subtotal}
                            Tax={orderData!.tax}
                            ProductQuantity={itemsInOrder}
                            isPayed={orderData!.isPaid}
                        />

                    </div>
                </div>
            </div>

        </>
    );
};