/*
  Warnings:

  - You are about to drop the column `avatar` on the `Post` table. All the data in the column will be lost.
  - The `likes` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `comment` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "avatar",
DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "comment",
ADD COLUMN     "comment" INTEGER NOT NULL DEFAULT 0;
