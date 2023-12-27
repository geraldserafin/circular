/*
  Warnings:

  - Added the required column `invite_code` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "invite_code" VARCHAR(32) NOT NULL;
