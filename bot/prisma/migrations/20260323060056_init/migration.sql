-- CreateTable
CREATE TABLE "Usage" (
    "guildId" BIGINT NOT NULL,
    "channelId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "counter" BIGINT NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL,
    "username" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL,
    "lastUpdate" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usage_guildId_channelId_userId_key" ON "Usage"("guildId", "channelId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
