-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PUBLIC', 'SECURITY', 'ADMIN');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('REPORTED', 'UNDER_REVIEW', 'APPROVED', 'CLAIMED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REJECT', 'CLAIM');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "personal_email" TEXT,
    "uni_email" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PUBLIC',
    "affiliation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "status" "ItemStatus" NOT NULL DEFAULT 'REPORTED',
    "category_id" TEXT NOT NULL,
    "found_location" TEXT NOT NULL,
    "found_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3),
    "ownership_proof" TEXT,
    "verification_notes" TEXT,
    "verified_by" TEXT,
    "verified_at" TIMESTAMP(3),
    "recorded_by" TEXT NOT NULL,
    "approved_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "ItemPhoto" (
    "photo_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "storage_url" TEXT NOT NULL,
    "file_key" TEXT,
    "mime_type" TEXT,
    "size" INTEGER,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemPhoto_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "ClaimRequest" (
    "claim_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "claimer_id" TEXT NOT NULL,
    "status" "ClaimStatus" NOT NULL DEFAULT 'PENDING',
    "ownership_desc" TEXT NOT NULL,
    "verification_notes" TEXT,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),

    CONSTRAINT "ClaimRequest_pkey" PRIMARY KEY ("claim_id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "log_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "old_status" "ItemStatus",
    "new_status" "ItemStatus",
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_personal_email_key" ON "User"("personal_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_uni_email_key" ON "User"("uni_email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "Item_status_idx" ON "Item"("status");

-- CreateIndex
CREATE INDEX "Item_category_id_idx" ON "Item"("category_id");

-- CreateIndex
CREATE INDEX "Item_recorded_by_idx" ON "Item"("recorded_by");

-- CreateIndex
CREATE INDEX "Item_approved_by_idx" ON "Item"("approved_by");

-- CreateIndex
CREATE INDEX "ItemPhoto_item_id_idx" ON "ItemPhoto"("item_id");

-- CreateIndex
CREATE INDEX "ClaimRequest_item_id_idx" ON "ClaimRequest"("item_id");

-- CreateIndex
CREATE INDEX "ClaimRequest_claimer_id_idx" ON "ClaimRequest"("claimer_id");

-- CreateIndex
CREATE INDEX "ClaimRequest_status_idx" ON "ClaimRequest"("status");

-- CreateIndex
CREATE INDEX "AuditLog_item_id_idx" ON "AuditLog"("item_id");

-- CreateIndex
CREATE INDEX "AuditLog_changed_by_idx" ON "AuditLog"("changed_by");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_recorded_by_fkey" FOREIGN KEY ("recorded_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPhoto" ADD CONSTRAINT "ItemPhoto_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimRequest" ADD CONSTRAINT "ClaimRequest_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimRequest" ADD CONSTRAINT "ClaimRequest_claimer_id_fkey" FOREIGN KEY ("claimer_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
