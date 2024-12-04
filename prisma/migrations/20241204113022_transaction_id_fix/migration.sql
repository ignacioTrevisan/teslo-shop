/*
  Warnings:

  - You are about to drop the column `transactionId` on the `UserAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "transactionId" TEXT;

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "transactionId";
