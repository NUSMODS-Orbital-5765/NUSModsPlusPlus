/*
  Warnings:

  - Added the required column `nanoid` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "nanoid" TEXT NOT NULL,
ALTER COLUMN "priority" SET DATA TYPE TEXT;
