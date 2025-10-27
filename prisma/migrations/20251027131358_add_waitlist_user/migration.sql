-- CreateTable
CREATE TABLE "WaitlistUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "referralCode" TEXT NOT NULL,
    "referredById" TEXT,
    "invited" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistUser_email_key" ON "WaitlistUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistUser_referralCode_key" ON "WaitlistUser"("referralCode");

-- AddForeignKey
ALTER TABLE "WaitlistUser" ADD CONSTRAINT "WaitlistUser_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "WaitlistUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
