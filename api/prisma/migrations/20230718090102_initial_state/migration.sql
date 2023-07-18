-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "NUSId" TEXT NOT NULL,
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
    "PostAuthorId" INTEGER NOT NULL,
    "LikedUserId" INTEGER NOT NULL,

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
CREATE TABLE "Programme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "combination" TEXT[],
    "commonModuleGroupId" INTEGER NOT NULL,

    CONSTRAINT "Programme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoreModuleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "faculty" TEXT,
    "rules" JSONB NOT NULL,

    CONSTRAINT "CoreModuleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonModuleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "rules" JSONB NOT NULL,

    CONSTRAINT "CommonModuleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "acadYear" TEXT NOT NULL,
    "preclusion" TEXT,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "workload" TEXT,
    "attributes" JSONB,
    "prerequisite" TEXT,
    "moduleCredit" TEXT NOT NULL,
    "moduleCode" TEXT NOT NULL,
    "prereqTree" JSONB,
    "aliases" TEXT[],
    "corequisite" TEXT,
    "fulfillRequirements" TEXT[],

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "_CommentToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CoreModuleGroupToProgramme" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_NUSId_key" ON "User"("NUSId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToPost_AB_unique" ON "_CommentToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToPost_B_index" ON "_CommentToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoreModuleGroupToProgramme_AB_unique" ON "_CoreModuleGroupToProgramme"("A", "B");

-- CreateIndex
CREATE INDEX "_CoreModuleGroupToProgramme_B_index" ON "_CoreModuleGroupToProgramme"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_PostAuthorId_fkey" FOREIGN KEY ("PostAuthorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_LikedUserId_fkey" FOREIGN KEY ("LikedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_commonModuleGroupId_fkey" FOREIGN KEY ("commonModuleGroupId") REFERENCES "CommonModuleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToPost" ADD CONSTRAINT "_CommentToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToPost" ADD CONSTRAINT "_CommentToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoreModuleGroupToProgramme" ADD CONSTRAINT "_CoreModuleGroupToProgramme_A_fkey" FOREIGN KEY ("A") REFERENCES "CoreModuleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoreModuleGroupToProgramme" ADD CONSTRAINT "_CoreModuleGroupToProgramme_B_fkey" FOREIGN KEY ("B") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
