/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
