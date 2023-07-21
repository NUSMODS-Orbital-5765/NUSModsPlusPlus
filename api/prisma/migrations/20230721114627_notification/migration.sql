-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userIdFrom" INTEGER NOT NULL,
    "userIdTo" INTEGER NOT NULL,
    "hiddenValue" JSONB,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModulePlan" (
    "id" SERIAL NOT NULL,
    "GradRequirement" JSONB,
    "SemesterModulePlan" JSONB,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "AdminComment" TEXT NOT NULL,

    CONSTRAINT "ModulePlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userIdFrom_fkey" FOREIGN KEY ("userIdFrom") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userIdTo_fkey" FOREIGN KEY ("userIdTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulePlan" ADD CONSTRAINT "ModulePlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
