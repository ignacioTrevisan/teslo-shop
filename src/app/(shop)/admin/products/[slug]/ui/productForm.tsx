"use client";


import { Product } from '../../../../../../interface/product.interfaces';
import { useForm } from "react-hook-form";
import { ProductImage as ProductImageInterface } from "@prisma/client";
import Image from "next/image";
import { AddUpdateProducts } from '@/actions/products/add-update.products';
import { useRouter } from 'next/navigation';
import { ProductImage } from '@/components/product/product-image/product-image';
import { DeleteProductImages } from '@/actions/products/delete-product-images';


interface Props {
    product: Partial<Product> & { ProductImage?: ProductImageInterface[] };
    productCategory: 'shirts' | 'pants' | 'hoodies' | 'hats' | null
    categoryAvailable: {
        id: string;
        name: string;
    }[]
}

interface FormInput {
    title: string,
    slug: string,
    description: string,
    price: number,
    inStock: number,
    sizes: string[],
    tags: string,
    gender: 'men' | 'women' | 'kid' | 'unisex',
    categoryId: string,
    images?: FileList;
}
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categoryAvailable }: Props) => {
    console.log({ product })
    const { handleSubmit, register, formState: { isValid }, getValues, setValue, watch } =
        useForm<FormInput>({
            defaultValues:
            {
                ...product,
                tags: product.tags?.join(','),
                description: product.description!,
                sizes: product.sizes ?? [],
                images: undefined
            }
        })
    watch('sizes')
    const onSizeChanged = (size: string) => {
        const sizes = new Set(getValues('sizes'))
        sizes.has(size) ? sizes.delete(size) : sizes.add(size)
        setValue('sizes', Array.from(sizes))
    }
    const router = useRouter();
    const onSubmit = async (data: FormInput) => {
        console.log({ data })
        const form = new FormData();
        const { images, ...productValue } = data;
        if (product.id) {

            form.append('id', product.id ?? '')
        }
        if (images) {
            for (let i = 0; i < images.length; i++) {
                form.append('images', images[i])
            }
        }
        form.append('title', productValue.title)
        form.append('tags', productValue.tags)
        form.append('description', productValue.description)
        form.append('gender', productValue.gender)
        form.append('inStock', productValue.inStock.toString())
        form.append('price', productValue.price.toString())
        form.append('slug', productValue.slug)
        form.append('categoryId', productValue.categoryId)
        form.append('sizes', productValue.sizes.toString())
        const { ok, product: newProduct } = await AddUpdateProducts(form);
        if (ok) {
            router.replace(`/admin/products/${newProduct!.slug}`)
        }
    }

    const handleDelete = async (id: string, url: string) => {
        const resp = await DeleteProductImages(id, url);
        console.log(resp)
    }


    return (
        <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"  {...register('title', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"  {...register('slug', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"

                        {...register('description', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200"
                        {...register('price', { required: true, min: 0 })}
                    />
                </div>




                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                        {...register('tags', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register('gender', { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register('categoryId', { required: true })}


                    >
                        <option value="">[Seleccione]</option>
                        {categoryAvailable.map((c) =>
                            <option key={c.id} value={c.id}>{c.name}</option>
                        )}
                    </select>
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>

            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Inventario</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200"
                        {...register('inStock', { required: true, min: 0 })}
                    />
                </div>
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map((size) => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    key={size}
                                    onClick={() => onSizeChanged(size)}
                                    className={`flex items-center justify-center w-10 h-10 cursor-pointer mr-2 border rounded-md ${getValues('sizes').includes(size) ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            {...register('images')}
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />


                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">

                            {
                                product.ProductImage?.map((i) => (

                                    <div key={i.id}>

                                        <ProductImage
                                            alt={product.title ?? 'product image'}
                                            src={i.Url}
                                            width={300}
                                            height={300}
                                            className="rounded shadow-md" />
                                        <button className='btn-danger rounded-b-xl mt-2 w-full' type='button' onClick={() => handleDelete(i.id.toString(), i.Url)}>Eliminar</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
};