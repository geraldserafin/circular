/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_url_key" ON "Workspace"("url");
