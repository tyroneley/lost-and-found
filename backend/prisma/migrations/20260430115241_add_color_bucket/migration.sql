/*
  Warnings:

  - You are about to drop the column `color` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "color",
ADD COLUMN     "color_bucket" TEXT,
ADD COLUMN     "color_hex" TEXT;
