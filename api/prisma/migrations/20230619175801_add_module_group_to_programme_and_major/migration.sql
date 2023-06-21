/*
  Warnings:

  - Added the required column `majorId` to the `Programme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programme" ADD COLUMN     "majorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_ModuleGroupToProgramme" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleGroupToProgramme_AB_unique" ON "_ModuleGroupToProgramme"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleGroupToProgramme_B_index" ON "_ModuleGroupToProgramme"("B");

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleGroupToProgramme" ADD CONSTRAINT "_ModuleGroupToProgramme_A_fkey" FOREIGN KEY ("A") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleGroupToProgramme" ADD CONSTRAINT "_ModuleGroupToProgramme_B_fkey" FOREIGN KEY ("B") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
