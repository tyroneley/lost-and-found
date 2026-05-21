/*
  Warnings:

  - The values [REPORTED,UNDER_REVIEW,APPROVED,CLAIMED,EXPIRED] on the enum `ItemStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [SECURITY,ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `approved_by` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `ownership_proof` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `verification_notes` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `verified_at` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `verified_by` on the `Item` table. All the data in the column will be lost.
  - Added the required column `building_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemStatus_new" AS ENUM ('ACTIVE', 'PENDING', 'RETURNED');
ALTER TABLE "Item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Item" ALTER COLUMN "status" TYPE "ItemStatus_new" USING ("status"::text::"ItemStatus_new");
ALTER TABLE "AuditLog" ALTER COLUMN "old_status" TYPE "ItemStatus_new" USING ("old_status"::text::"ItemStatus_new");
ALTER TABLE "AuditLog" ALTER COLUMN "new_status" TYPE "ItemStatus_new" USING ("new_status"::text::"ItemStatus_new");
ALTER TYPE "ItemStatus" RENAME TO "ItemStatus_old";
ALTER TYPE "ItemStatus_new" RENAME TO "ItemStatus";
DROP TYPE "ItemStatus_old";
ALTER TABLE "Item" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('PUBLIC', 'STAFF', 'SUPERADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'PUBLIC';
COMMIT;

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_approved_by_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_verified_by_fkey";

-- DropIndex
DROP INDEX "Item_approved_by_idx";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "approved_by",
DROP COLUMN "ownership_proof",
DROP COLUMN "verification_notes",
DROP COLUMN "verified_at",
DROP COLUMN "verified_by",
ADD COLUMN     "building_id" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "Building" (
    "building_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("building_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Building_name_key" ON "Building"("name");

-- CreateIndex
CREATE INDEX "Item_building_id_idx" ON "Item"("building_id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "Building"("building_id") ON DELETE RESTRICT ON UPDATE CASCADE;
