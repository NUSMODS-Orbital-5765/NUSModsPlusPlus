/*
  Warnings:

  - A unique constraint covering the columns `[nanoid]` on the table `ModulePlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ModulePlan_nanoid_key" ON "ModulePlan"("nanoid");
