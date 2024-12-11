

export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Pagination, Title } from "@/components";
import { ProductGrid } from "@/components/products/productsGrid/productGrid";
import { Gender } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: Promise<{ gender: string }>;

    searchParams: Promise<{ page?: string }>;
}




export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const paramsResolved = (await params).gender


    return {
        title: paramsResolved,
        description: `ropa para el genero ${paramsResolved}`,

    }
}



export default async function ShopWithSearchParams({ params, searchParams }: Props) {

    const resolvedParams = await params;  // Esperar a que se resuelva la promesa
    const resolvedSearchParams = await searchParams;

    const { gender } = resolvedParams;
    const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 0;

    const isValidGender = gender === 'women' || gender === 'men' || gender === 'kid' || gender === 'unisex';
    if (!isValidGender) {
        notFound()
        return;
    }

    const { products, totalPage } = await getPaginatedProductsWithImages({
        page: +page,
        take: 12,
        gender: gender as Gender,
    });

    // Redirecciona si no hay productos
    if (products.length === 0) {
        redirect('/');
    }

    return (
        <>
            <Title
                title={gender ? gender : 'hola'}
                subtitle={resolvedParams.gender}
                className="mb-2 "
            />
            <ProductGrid
                products={products}
            />
            <Pagination totalPages={totalPage} />
        </>
    );
};