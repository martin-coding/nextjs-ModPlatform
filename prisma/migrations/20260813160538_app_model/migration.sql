/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "UploadStatus" AS ENUM ('PENDING', 'UPLOADING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "hero_image" TEXT,
    "icon_image" TEXT,
    "background_image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "game_id" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mod" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description_short" TEXT,
    "description_long" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_released_at" TIMESTAMP(3),
    "status" "ModStatus" NOT NULL DEFAULT 'DRAFT',
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "unique_downloads" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "category_id" TEXT,

    CONSTRAINT "mod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModLike" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mod_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ModLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModVersion" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "version" TEXT,
    "notes" TEXT,
    "status" "ModStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modId" TEXT NOT NULL,

    CONSTRAINT "ModVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModFile" (
    "id" UUID NOT NULL,
    "storage_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "data_type" TEXT,
    "type" TEXT NOT NULL DEFAULT 'main',
    "status" "UploadStatus" NOT NULL DEFAULT 'UPLOADING',
    "download_count" INTEGER NOT NULL DEFAULT 0,
    "version_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModImage" (
    "id" UUID NOT NULL,
    "storage_key" TEXT NOT NULL,
    "title" TEXT,
    "position" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "status" "UploadStatus" NOT NULL DEFAULT 'PENDING',
    "mod_id" TEXT NOT NULL,
    "uploaded_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ModTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_slug_key" ON "game"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "category_game_id_slug_key" ON "category"("game_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "mod_slug_key" ON "mod"("slug");

-- CreateIndex
CREATE INDEX "mod_user_id_idx" ON "mod"("user_id");

-- CreateIndex
CREATE INDEX "mod_game_id_idx" ON "mod"("game_id");

-- CreateIndex
CREATE INDEX "mod_category_id_idx" ON "mod"("category_id");

-- CreateIndex
CREATE INDEX "ModLike_mod_id_idx" ON "ModLike"("mod_id");

-- CreateIndex
CREATE INDEX "ModLike_user_id_idx" ON "ModLike"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ModLike_user_id_mod_id_key" ON "ModLike"("user_id", "mod_id");

-- CreateIndex
CREATE INDEX "ModVersion_modId_idx" ON "ModVersion"("modId");

-- CreateIndex
CREATE UNIQUE INDEX "ModVersion_modId_version_key" ON "ModVersion"("modId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "ModFile_storage_key_key" ON "ModFile"("storage_key");

-- CreateIndex
CREATE INDEX "ModFile_version_id_idx" ON "ModFile"("version_id");

-- CreateIndex
CREATE UNIQUE INDEX "ModImage_storage_key_key" ON "ModImage"("storage_key");

-- CreateIndex
CREATE INDEX "ModImage_mod_id_position_idx" ON "ModImage"("mod_id", "position");

-- CreateIndex
CREATE INDEX "ModImage_uploaded_by_id_idx" ON "ModImage"("uploaded_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "ModImage_mod_id_position_key" ON "ModImage"("mod_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_ModTags_B_index" ON "_ModTags"("B");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod" ADD CONSTRAINT "mod_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod" ADD CONSTRAINT "mod_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod" ADD CONSTRAINT "mod_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModLike" ADD CONSTRAINT "ModLike_mod_id_fkey" FOREIGN KEY ("mod_id") REFERENCES "mod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModLike" ADD CONSTRAINT "ModLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModVersion" ADD CONSTRAINT "ModVersion_modId_fkey" FOREIGN KEY ("modId") REFERENCES "mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModFile" ADD CONSTRAINT "ModFile_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "ModVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModImage" ADD CONSTRAINT "ModImage_mod_id_fkey" FOREIGN KEY ("mod_id") REFERENCES "mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModImage" ADD CONSTRAINT "ModImage_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModTags" ADD CONSTRAINT "_ModTags_A_fkey" FOREIGN KEY ("A") REFERENCES "mod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModTags" ADD CONSTRAINT "_ModTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
