/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `nameCategory` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titlePost` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "nameCategory" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "title",
ADD COLUMN     "titlePost" TEXT NOT NULL;
