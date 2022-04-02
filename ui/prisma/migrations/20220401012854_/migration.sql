/*
  Warnings:

  - Added the required column `contract` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "contract" VARCHAR(100) NOT NULL;
