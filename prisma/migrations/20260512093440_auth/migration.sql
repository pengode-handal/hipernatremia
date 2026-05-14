/*
  Warnings:

  - You are about to drop the column `role` on the `opsi` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "opsi" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");
