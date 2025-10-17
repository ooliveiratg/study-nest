/*
  Warnings:

  - Made the column `content` on table `questions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."questions" ALTER COLUMN "content" SET NOT NULL;
