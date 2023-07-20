/*
  Warnings:

  - You are about to drop the column `LikedUserId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_LikedUserId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "LikedUserId",
ADD COLUMN     "like" TEXT[];
