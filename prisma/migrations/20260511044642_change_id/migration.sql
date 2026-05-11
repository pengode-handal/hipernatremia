/*
  Warnings:

  - The primary key for the `opsi` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "opsi" DROP CONSTRAINT "opsi_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "opsi_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "opsi_id_seq";
