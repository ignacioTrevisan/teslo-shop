// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, Title } from '@/components';
import Image from 'next/image';

import Link from 'next/link';
import { CurrencyFormatter } from '../../../../utils/currencyFormatter';
import { redirect } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import { ProductImage } from '@/components/product/product-image/product-image';

interface Props {
    searchParams: Promise<{ page?: string }>;
}

export default async function ProductsManagmentPage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    if (!resolvedSearchParams.page) {
        redirect('/admin/products?page=1')
    }
    const page = resolvedSearchParams ? Number(resolvedSearchParams.page) : 0;

    const { products, totalPage } = await getPaginatedProductsWithImages({ page, take: 12 });

    return (
        <>
            <Title title="Manteniemiento de productos" />

            <div className="mb-10">
                <div className='w-full flex justify-end relative mb-2'>
                    <Link href='/admin/products/new' className='btn btn-primary self-end right-0'>Nuevo producto</Link>
                </div>
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>

                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Imagen
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Titulo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Género
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Inventario
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Tallas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(products.map((p) =>


                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Link href={`http://localhost:3000/product/${p.slug}`}>
                                        <ProductImage
                                            src={p.images[0]}
                                            alt='product image'
                                            width={150}
                                            height={150}
                                            className='w-20 h-20 object-cover rounded-md'
                                        />
                                    </Link>
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 ">
                                    <Link href={`/admin/products/${p.slug}`}
                                        className='hover:underline'
                                    >

                                        {p.title}
                                    </Link>
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6  ">
                                    <p className='font-bold'>

                                        {CurrencyFormatter(p.price)}
                                    </p>

                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 ">
                                    {p.gender}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 ">
                                    {p.inStock}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 flex-row justify-center ">
                                    <div className='flex font-bold'>

                                        {p.sizes.join('-')}
                                    </div>
                                </td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div >
            <Pagination totalPages={totalPage} />
        </>
    );
}