/*
  Warnings:

  - You are about to drop the column `description` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `verification_notes` on the `ClaimRequest` table. All the data in the column will be lost.
  - You are about to drop the column `found_location` on the `Item` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Building" DROP COLUMN "description",
ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "ClaimRequest" DROP COLUMN "verification_notes",
ADD COLUMN     "staff_notes" TEXT;

-- CreateTable
CREATE TABLE "Room" (
    "room_id" TEXT NOT NULL,
    "room_number" INTEGER,
    "room_name" TEXT NOT NULL,
    "building_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("room_id")
);

-- CreateIndex
CREATE INDEX "Room_building_id_idx" ON "Room"("building_id");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "Building"("building_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create default rooms for each building to handle existing items
INSERT INTO "Room" (room_id, room_name, building_id) 
SELECT 
    gen_random_uuid(),
    'General Storage',
    building_id
FROM "Building";

-- AlterTable - First add room_id with nullable column
ALTER TABLE "Item" 
ADD COLUMN "room_id" TEXT,
DROP COLUMN "found_location",
ADD COLUMN "finder_affiliation" TEXT,
ADD COLUMN "finder_contact" TEXT,
ADD COLUMN "finder_name" TEXT,
ADD COLUMN "found_time_known" BOOLEAN NOT NULL DEFAULT true;

-- Update existing items to use a default room from their building
UPDATE "Item" i
SET room_id = (
    SELECT room_id 
    FROM "Room" r 
    WHERE r.building_id = i.building_id 
    LIMIT 1
);

-- Now make room_id NOT NULL
ALTER TABLE "Item" 
ALTER COLUMN "room_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Item_room_id_idx" ON "Item"("room_id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;
