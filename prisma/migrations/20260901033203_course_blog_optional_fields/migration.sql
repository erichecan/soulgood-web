-- AlterTable
ALTER TABLE "BlogPost" ALTER COLUMN "titleEn" DROP NOT NULL,
ALTER COLUMN "contentEn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "compareAtPrice" DECIMAL(65,30),
ADD COLUMN     "whatYoullLearnEn" TEXT,
ADD COLUMN     "whatYoullLearnZh" TEXT,
ALTER COLUMN "titleEn" DROP NOT NULL;
