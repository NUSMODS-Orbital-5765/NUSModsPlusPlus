/*
  Warnings:

  - You are about to drop the `_CommentToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommentToPost" DROP CONSTRAINT "_CommentToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToPost" DROP CONSTRAINT "_CommentToPost_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "postId" INTEGER;

-- DropTable
DROP TABLE "_CommentToPost";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
