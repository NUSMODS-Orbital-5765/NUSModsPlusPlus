/*
  Warnings:

  - You are about to drop the column `studentId` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffId` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_studentId_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "studentId",
ADD COLUMN     "staffId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_staffId_key" ON "Admin"("staffId");
