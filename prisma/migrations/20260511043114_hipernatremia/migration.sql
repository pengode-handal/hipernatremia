-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "opsi" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "beratBadan" INTEGER NOT NULL,
    "risikoMeter" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "umur" INTEGER NOT NULL,
    "tinggiBadan" INTEGER NOT NULL,

    CONSTRAINT "opsi_pkey" PRIMARY KEY ("id")
);
