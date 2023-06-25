/*
  Warnings:

  - You are about to drop the column `requirement` on the `Major` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Major" DROP COLUMN "requirement";

-- CreateTable
CREATE TABLE "Minor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "Minor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "moduleCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moduleCredit" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "professor" TEXT[],
    "prequesiteTree" JSONB,
    "SUablity" BOOLEAN NOT NULL,
    "preclusion" TEXT[],
    "semesterId" INTEGER NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" SERIAL NOT NULL,
    "semesterCode" TEXT NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleGroup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ModuleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MajorToModuleGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MinorToModuleGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModuleToModuleGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MajorToModuleGroup_AB_unique" ON "_MajorToModuleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_MajorToModuleGroup_B_index" ON "_MajorToModuleGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MinorToModuleGroup_AB_unique" ON "_MinorToModuleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_MinorToModuleGroup_B_index" ON "_MinorToModuleGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleToModuleGroup_AB_unique" ON "_ModuleToModuleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleToModuleGroup_B_index" ON "_ModuleToModuleGroup"("B");

-- AddForeignKey
ALTER TABLE "Minor" ADD CONSTRAINT "Minor_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorToModuleGroup" ADD CONSTRAINT "_MajorToModuleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Major"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorToModuleGroup" ADD CONSTRAINT "_MajorToModuleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MinorToModuleGroup" ADD CONSTRAINT "_MinorToModuleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Minor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MinorToModuleGroup" ADD CONSTRAINT "_MinorToModuleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToModuleGroup" ADD CONSTRAINT "_ModuleToModuleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToModuleGroup" ADD CONSTRAINT "_ModuleToModuleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
