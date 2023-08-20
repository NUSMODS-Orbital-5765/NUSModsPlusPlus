/*
  Warnings:

  - A unique constraint covering the columns `[nanoid]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_nanoid_key" ON "Event"("nanoid");
