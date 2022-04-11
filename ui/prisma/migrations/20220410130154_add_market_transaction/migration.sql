-- CreateEnum
CREATE TYPE "MarketAction" AS ENUM ('Buy', 'Sell');

-- CreateEnum
CREATE TYPE "Vote" AS ENUM ('Yes', 'No');

-- CreateTable
CREATE TABLE "MarketTransaction" (
    "id" TEXT NOT NULL,
    "hash" VARCHAR(100) NOT NULL,
    "account" VARCHAR(100) NOT NULL,
    "amount" VARCHAR(100) NOT NULL,
    "action" "MarketAction" NOT NULL DEFAULT E'Buy',
    "vote" "Vote" NOT NULL DEFAULT E'Yes',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "marketId" TEXT NOT NULL,

    CONSTRAINT "MarketTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MarketTransaction" ADD CONSTRAINT "MarketTransaction_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
