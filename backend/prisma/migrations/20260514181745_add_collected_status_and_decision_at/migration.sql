-- AlterEnum
ALTER TYPE "ClaimStatus" ADD VALUE 'COLLECTED';

-- AlterTable
ALTER TABLE "ClaimRequest" ADD COLUMN     "decision_at" TIMESTAMP(3);
