import { GetProductBySlug } from '@/actions/products/get-product-by-slug';
import { Title } from '@/components';
import type { Metadata } from 'next'
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/productForm';
import { GetCategories } from '@/actions/products/get-categories';


export const metadata: Metadata = {
    title: 'ProductPage Title',
    description: 'ProductPage Description'
};

interface Props {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductPage({ params }: Props,) {
    const slug = (await params).slug
    const [{ product, ok }, { availableCategories, productCategory }] = await Promise.all([

        GetProductBySlug(slug),
        GetCategories()

    ])

    if (!product && slug !== 'new') {
        redirect('admin/products')
    }
    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto';

    return (
        <>
            <Title title={title} />
            <ProductForm product={product ?? {}} categoryAvailable={availableCategories.map((c) => c)} productCategory={productCategory?.category.name as 'shirts' | 'pants' | 'hoodies' | 'hats'} />
        </>
    );
};