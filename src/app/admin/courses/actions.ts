"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import { createCourse, deleteCourse, updateCourse, type CourseInput } from "@/lib/db/courses";

function parseCourseInput(formData: FormData): CourseInput {
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    titleZh: String(formData.get("titleZh") ?? "").trim() || null,
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionZh: String(formData.get("descriptionZh") ?? "").trim() || null,
    price: Number(formData.get("price") ?? 0),
    level: String(formData.get("level") ?? "").trim() || null,
    thumbnailUrl: String(formData.get("thumbnailUrl") ?? "").trim() || null,
    publishedAt: publishedAt ? new Date(publishedAt) : null,
  };
}

export async function createCourseAction(formData: FormData) {
  await requireAdmin();
  await createCourse(parseCourseInput(formData));
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function updateCourseAction(id: string, formData: FormData) {
  await requireAdmin();
  await updateCourse(id, parseCourseInput(formData));
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function deleteCourseAction(id: string) {
  await requireAdmin();
  await deleteCourse(id);
  revalidatePath("/admin/courses");
}
