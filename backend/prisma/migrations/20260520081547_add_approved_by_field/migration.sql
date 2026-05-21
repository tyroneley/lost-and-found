-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "approved_by" TEXT;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
