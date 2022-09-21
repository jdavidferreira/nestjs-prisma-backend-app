/*
  Warnings:

  - The `priority` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "priority",
ADD COLUMN     "priority" "OrderPriority" NOT NULL DEFAULT 'LOW';

-- DropEnum
DROP TYPE "Priority";
