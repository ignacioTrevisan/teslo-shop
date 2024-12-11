export const revalidate = 600;
import { titleFont } from '@/config/fonts';
import { notFound } from 'next/navigation';
import { ImageSwiper } from '@/components/product/imageSwiper/imageSwiper';
import { ImageSwiperMobile } from '@/components/product/imageSwiper/imageSwiperMobile';
import { GetProductBySlug } from '@/actions/products/get-product-by-slug';
import { StockLabel } from '@/components/product/stockLabel/stockLabel';
import { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react';
import { QuantitySizeSelector } from '../../../../components/product/quantity-Size-selector/quantity-Size-Selector';
import { Product } from '@/interface';

interface Props {
    params: Promise<{
        slug: string
    }>
}

const getProductBySlugCached = cache(GetProductBySlug);


export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const slug = (await params).slug
    const resp = await getProductBySlugCached(slug);
    const { ok, product } = resp;
    if (!product) {
        throw Error('No se pudo obtener el producto solicitado.')
    }
    return {
        title: product.title,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description ?? '',
            images: [`/products/${product.images[1]}`],
        },
    }
}


export default async function ProductPage({ params }: Props) {
    const paramsResolved = await params;
    const resp = await getProductBySlugCached(paramsResolved.slug);
    const { ok, product } = resp;
    if (!product) {
        notFound()
    }
    return (
        <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
            <div className='col-span-1 md:col-span-2 '>
                <ImageSwiperMobile images={product.images} title={product.title} className='block md:hidden' />

                <ImageSwiper images={product.images} title={product.title} className='hidden md:block' />
            </div>
            <div className="col-span-1 px-5 ">
                <StockLabel slug={paramsResolved.slug} />
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className='text-lg mb-5'>${product.price.toFixed(2)}</p>

                <QuantitySizeSelector product={product} />
                {/* descripcion */}
                <h3 className='font-bold text-sm'>Descripcion</h3>
                <p className='font-light'>{product.description}</p>
            </div>
        </div>
    );
};