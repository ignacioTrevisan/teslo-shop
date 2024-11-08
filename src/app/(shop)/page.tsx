export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductGrid } from "@/components/products/productsGrid/productGrid";
import { redirect } from "next/navigation";


interface Props {
  searchParams: Promise<{ page?: string }>;  // Lo mismo para searchParams

}
export default async function ShopPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams ? Number(resolvedSearchParams.page) : 0;
  const { products, totalPage } = await getPaginatedProductsWithImages({ page, take: 12 });

  if (products.length === 0) {
    redirect('/')
  }
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
