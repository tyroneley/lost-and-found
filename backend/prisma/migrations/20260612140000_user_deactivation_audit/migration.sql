-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'DEACTIVATE';
ALTER TYPE "AuditAction" ADD VALUE 'REACTIVATE';

-- AlterTable
ALTER TABLE "AuditLog" ALTER COLUMN "item_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN "target_user_id" TEXT;

-- CreateIndex
CREATE INDEX "AuditLog_target_user_id_idx" ON "AuditLog"("target_user_id");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
