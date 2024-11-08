-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "Url" TEXT NOT NULL,
    "ProductId" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
