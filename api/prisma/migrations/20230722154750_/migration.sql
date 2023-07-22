/*
  Warnings:

  - You are about to drop the column `GradRequirement` on the `ModulePlan` table. All the data in the column will be lost.
  - You are about to drop the column `SemesterModulePlan` on the `ModulePlan` table. All the data in the column will be lost.
  - Added the required column `nanoid` to the `ModulePlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModulePlan" DROP COLUMN "GradRequirement",
DROP COLUMN "SemesterModulePlan",
ADD COLUMN     "academicPlan" JSONB,
ADD COLUMN     "gradRequirementsDict" JSONB,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nanoid" TEXT NOT NULL,
ADD COLUMN     "semesterModulesDict" JSONB,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "AdminComment" DROP NOT NULL;
