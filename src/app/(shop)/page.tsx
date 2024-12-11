


import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Pagination, Title } from "@/components";
import { ProductGrid } from "@/components/products/productsGrid/productGrid";
import { unstable_cache } from "next/cache";


interface Props {
  searchParams: Promise<{ page?: string }>;

}
export default async function ShopPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams ? Number(resolvedSearchParams.page) : 0;
  //Resuelvo el searchaParams por que en la v15 de next los params hay que recibirlos como promises. Estamos en v14 pero inicialmente era v15.


  const getProducts = unstable_cache(
    async () => await getPaginatedProductsWithImages({ page, take: 12 }),
    [`AllProducts-page: ${page}`],
    { revalidate: 600 },
  )


  const { products, totalPage } = await getProducts();

  // if (products.length === 0) {
  //   redirect('/')
  // }
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2 "
      />
      <ProductGrid
        products={products}
      />
      <Pagination totalPages={totalPage} />
    </>
  );
}
