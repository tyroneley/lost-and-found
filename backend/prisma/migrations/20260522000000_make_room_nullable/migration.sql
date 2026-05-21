-- Make room_id optional on Item to support items recorded before rooms are defined
ALTER TABLE "Item" ALTER COLUMN "room_id" DROP NOT NULL;
