import { prisma } from "@/lib/db/prisma";

export function listCourses() {
  return prisma.course.findMany({ orderBy: { createdAt: "desc" } });
}

export function listPublishedCourses() {
  return prisma.course.findMany({ orderBy: { publishedAt: "desc" } });
}

export function getCourse(id: string) {
  return prisma.course.findUnique({ where: { id } });
}

export function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({ where: { slug } });
}

export type CourseInput = {
  slug: string;
  titleEn: string | null;
  titleZh: string | null;
  descriptionEn: string | null;
  descriptionZh: string | null;
  whatYoullLearnEn: string | null;
  whatYoullLearnZh: string | null;
  price: number;
  compareAtPrice: number | null;
  level: string | null;
  thumbnailUrl: string | null;
  publishedAt: Date | null;
};

export function createCourse(input: CourseInput) {
  return prisma.course.create({ data: input });
}

export function updateCourse(id: string, input: CourseInput) {
  return prisma.course.update({ where: { id }, data: input });
}

export function deleteCourse(id: string) {
  return prisma.course.delete({ where: { id } });
}
