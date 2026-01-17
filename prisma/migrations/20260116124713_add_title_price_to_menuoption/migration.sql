/*
  Warnings:

  - Added the required column `price` to the `MenuOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MenuOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuOption" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
