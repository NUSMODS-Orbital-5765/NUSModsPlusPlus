/*
  Warnings:

  - You are about to drop the `_ModuleGroupToProgramme` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `commonModuleId` to the `Programme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ModuleGroupToProgramme" DROP CONSTRAINT "_ModuleGroupToProgramme_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModuleGroupToProgramme" DROP CONSTRAINT "_ModuleGroupToProgramme_B_fkey";

-- AlterTable
ALTER TABLE "Programme" ADD COLUMN     "commonModuleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ModuleGroupToProgramme";

-- CreateTable
CREATE TABLE "CommonModule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "CommonModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommonModuleToModuleGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommonModuleToModuleGroup_AB_unique" ON "_CommonModuleToModuleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_CommonModuleToModuleGroup_B_index" ON "_CommonModuleToModuleGroup"("B");

-- AddForeignKey
ALTER TABLE "CommonModule" ADD CONSTRAINT "CommonModule_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_commonModuleId_fkey" FOREIGN KEY ("commonModuleId") REFERENCES "CommonModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommonModuleToModuleGroup" ADD CONSTRAINT "_CommonModuleToModuleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "CommonModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommonModuleToModuleGroup" ADD CONSTRAINT "_CommonModuleToModuleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
