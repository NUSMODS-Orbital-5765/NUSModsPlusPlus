-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "primaryMajor" TEXT NOT NULL,
    "secondaryMajor" TEXT,
    "minors" TEXT,
    "programme" TEXT,
    "interests" TEXT[],
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "relatedMajor" TEXT,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "upload_file" TEXT[],
    "tags" TEXT[],
    "authorId" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Major" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Minor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "Minor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonModule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "CommonModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,
    "commonModuleId" INTEGER NOT NULL,

    CONSTRAINT "Programme_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "avatar" TEXT,
    "programme" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommentToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
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
CREATE TABLE "_CommonModuleToModuleGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModuleToModuleGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_studentId_key" ON "Admin"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToPost_AB_unique" ON "_CommentToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToPost_B_index" ON "_CommentToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MajorToModuleGroup_AB_unique" ON "_MajorToModuleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_MajorToModuleGroup_B_index" ON "_MajorToModuleGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MinorToModuleGroup_AB_unique" ON "_MinorToModuleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_MinorToModuleGroup_B_index" ON "_MinorToModuleGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommonModuleToModuleGroup_AB_unique" ON "_CommonModuleToModuleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_CommonModuleToModuleGroup_B_index" ON "_CommonModuleToModuleGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleToModuleGroup_AB_unique" ON "_ModuleToModuleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleToModuleGroup_B_index" ON "_ModuleToModuleGroup"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Minor" ADD CONSTRAINT "Minor_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonModule" ADD CONSTRAINT "CommonModule_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_commonModuleId_fkey" FOREIGN KEY ("commonModuleId") REFERENCES "CommonModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToPost" ADD CONSTRAINT "_CommentToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToPost" ADD CONSTRAINT "_CommentToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorToModuleGroup" ADD CONSTRAINT "_MajorToModuleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Major"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorToModuleGroup" ADD CONSTRAINT "_MajorToModuleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MinorToModuleGroup" ADD CONSTRAINT "_MinorToModuleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Minor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MinorToModuleGroup" ADD CONSTRAINT "_MinorToModuleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommonModuleToModuleGroup" ADD CONSTRAINT "_CommonModuleToModuleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "CommonModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommonModuleToModuleGroup" ADD CONSTRAINT "_CommonModuleToModuleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToModuleGroup" ADD CONSTRAINT "_ModuleToModuleGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToModuleGroup" ADD CONSTRAINT "_ModuleToModuleGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

