/*
  Warnings:

  - You are about to drop the `ModFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModVersion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModFile" DROP CONSTRAINT "ModFile_version_id_fkey";

-- DropForeignKey
ALTER TABLE "ModImage" DROP CONSTRAINT "ModImage_mod_id_fkey";

-- DropForeignKey
ALTER TABLE "ModImage" DROP CONSTRAINT "ModImage_uploaded_by_id_fkey";

-- DropForeignKey
ALTER TABLE "ModLike" DROP CONSTRAINT "ModLike_mod_id_fkey";

-- DropForeignKey
ALTER TABLE "ModLike" DROP CONSTRAINT "ModLike_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ModVersion" DROP CONSTRAINT "ModVersion_modId_fkey";

-- DropForeignKey
ALTER TABLE "_ModTags" DROP CONSTRAINT "_ModTags_B_fkey";

-- DropTable
DROP TABLE "ModFile";

-- DropTable
DROP TABLE "ModImage";

-- DropTable
DROP TABLE "ModLike";

-- DropTable
DROP TABLE "ModVersion";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "mod_like" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mod_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "mod_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mod_version" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "version" TEXT,
    "notes" TEXT,
    "status" "ModStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modId" TEXT NOT NULL,

    CONSTRAINT "mod_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mod_file" (
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

    CONSTRAINT "mod_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mod_image" (
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

    CONSTRAINT "mod_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "mod_like_mod_id_idx" ON "mod_like"("mod_id");

-- CreateIndex
CREATE INDEX "mod_like_user_id_idx" ON "mod_like"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "mod_like_user_id_mod_id_key" ON "mod_like"("user_id", "mod_id");

-- CreateIndex
CREATE INDEX "mod_version_modId_idx" ON "mod_version"("modId");

-- CreateIndex
CREATE UNIQUE INDEX "mod_version_modId_version_key" ON "mod_version"("modId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "mod_file_storage_key_key" ON "mod_file"("storage_key");

-- CreateIndex
CREATE INDEX "mod_file_version_id_idx" ON "mod_file"("version_id");

-- CreateIndex
CREATE UNIQUE INDEX "mod_image_storage_key_key" ON "mod_image"("storage_key");

-- CreateIndex
CREATE INDEX "mod_image_mod_id_position_idx" ON "mod_image"("mod_id", "position");

-- CreateIndex
CREATE INDEX "mod_image_uploaded_by_id_idx" ON "mod_image"("uploaded_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "mod_image_mod_id_position_key" ON "mod_image"("mod_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "tag_slug_key" ON "tag"("slug");

-- AddForeignKey
ALTER TABLE "mod_like" ADD CONSTRAINT "mod_like_mod_id_fkey" FOREIGN KEY ("mod_id") REFERENCES "mod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod_like" ADD CONSTRAINT "mod_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod_version" ADD CONSTRAINT "mod_version_modId_fkey" FOREIGN KEY ("modId") REFERENCES "mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod_file" ADD CONSTRAINT "mod_file_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "mod_version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod_image" ADD CONSTRAINT "mod_image_mod_id_fkey" FOREIGN KEY ("mod_id") REFERENCES "mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod_image" ADD CONSTRAINT "mod_image_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModTags" ADD CONSTRAINT "_ModTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
