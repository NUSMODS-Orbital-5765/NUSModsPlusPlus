-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "major" TEXT[],
    "minor" TEXT[],
    "faculty" TEXT NOT NULL,
    "interest" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
