-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "additionalInformation" TEXT,
ADD COLUMN     "gradingBasisDescription" TEXT,
ADD COLUMN     "prerequisiteRule" TEXT;

-- CreateTable
CREATE TABLE "GPATable" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GPATable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GPATable" ADD CONSTRAINT "GPATable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
