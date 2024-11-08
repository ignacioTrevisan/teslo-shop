import { SizeSelector, QuantitySelector } from '@/components/product/';
import { titleFont } from '@/config/fonts';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import { ImageSwiper } from '@/components/product/imageSwiper/imageSwiper';
import { ImageSwiperMobile } from '@/components/product/imageSwiper/imageSwiperMobile';

interface Props {
    params: Promise<{
        slug: string
    }>
    // params: Promise<{ gender: string }>;  // Ahora params es una promesa

}
export default async function ProductPage({ params }: Props) {
    const resolvedParams = await params;  // Esperar a que se resuelva la promesa

    const product = initialData.products.find((p) => p.slug === resolvedParams.slug);
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
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className='text-lg mb-5'>${product.price.toFixed(2)}</p>

                {/* Selector de tallas */}
                <SizeSelector Sizes={product.sizes} SelectedSize={product.sizes[0]} />
                {/* Selector de cantidad */}
                <QuantitySelector quantity={2} />

                {/* Boton */}

                <button className='btn-primary my-5'>Agregar al carrito</button>
                {/* descripcion */}
                <h3 className='font-bold text-sm'>Descripcion</h3>
                <p className='font-light'>{product.description}</p>
            </div>
        </div>
    );
};