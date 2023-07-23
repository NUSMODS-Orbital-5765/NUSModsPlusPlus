/*
  Warnings:

  - You are about to drop the column `AdminComment` on the `ModulePlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "modulePlanId" TEXT;

-- AlterTable
ALTER TABLE "ModulePlan" DROP COLUMN "AdminComment";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_modulePlanId_fkey" FOREIGN KEY ("modulePlanId") REFERENCES "ModulePlan"("nanoid") ON DELETE SET NULL ON UPDATE CASCADE;
