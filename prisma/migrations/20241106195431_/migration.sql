/*
  Warnings:

  - The values [Size] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');
ALTER TABLE "Producto" ALTER COLUMN "sizes" DROP DEFAULT;
ALTER TABLE "Producto" ALTER COLUMN "sizes" TYPE "Size_new"[] USING ("sizes"::text::"Size_new"[]);
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
ALTER TABLE "Producto" ALTER COLUMN "sizes" SET DEFAULT ARRAY[]::"Size"[];
COMMIT;
