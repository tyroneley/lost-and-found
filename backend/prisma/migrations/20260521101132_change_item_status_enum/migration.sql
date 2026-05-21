/*
  Warnings:

  - The values [PENDING] on the enum `ItemStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemStatus_new" AS ENUM ('ACTIVE', 'CLAIMED', 'COLLECTED', 'RETURNED');
ALTER TABLE "Item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Item" ALTER COLUMN "status" TYPE "ItemStatus_new" USING ("status"::text::"ItemStatus_new");
ALTER TABLE "AuditLog" ALTER COLUMN "old_status" TYPE "ItemStatus_new" USING ("old_status"::text::"ItemStatus_new");
ALTER TABLE "AuditLog" ALTER COLUMN "new_status" TYPE "ItemStatus_new" USING ("new_status"::text::"ItemStatus_new");
ALTER TYPE "ItemStatus" RENAME TO "ItemStatus_old";
ALTER TYPE "ItemStatus_new" RENAME TO "ItemStatus";
DROP TYPE "ItemStatus_old";
ALTER TABLE "Item" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;
