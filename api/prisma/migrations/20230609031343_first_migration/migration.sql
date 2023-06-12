-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "primaryMajor" TEXT NOT NULL,
    "secondaryMajor" TEXT,
    "minors" TEXT,
    "programme" TEXT NOT NULL,
    "interests" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
