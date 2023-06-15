-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "relatedMajor" TEXT,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "upload_file" TEXT[],
    "tags" TEXT[],
    "authorId" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "likes" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
