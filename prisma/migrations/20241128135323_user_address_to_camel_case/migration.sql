/*
  Warnings:

  - You are about to drop the column `Address` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `Address2` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `address` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "Address",
DROP COLUMN "Address2",
DROP COLUMN "LastName",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL;
