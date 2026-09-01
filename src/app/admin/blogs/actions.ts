"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import { createBlogPost, deleteBlogPost, updateBlogPost, type BlogPostInput } from "@/lib/db/blogs";

function parseBlogInput(formData: FormData): BlogPostInput {
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    titleZh: String(formData.get("titleZh") ?? "").trim() || null,
    contentEn: String(formData.get("contentEn") ?? "").trim(),
    contentZh: String(formData.get("contentZh") ?? "").trim() || null,
    coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim() || null,
    author: String(formData.get("author") ?? "").trim() || null,
    publishedAt: publishedAt ? new Date(publishedAt) : null,
  };
}

export async function createBlogPostAction(formData: FormData) {
  await requireAdmin();
  await createBlogPost(parseBlogInput(formData));
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function updateBlogPostAction(id: string, formData: FormData) {
  await requireAdmin();
  await updateBlogPost(id, parseBlogInput(formData));
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlogPostAction(id: string) {
  await requireAdmin();
  await deleteBlogPost(id);
  revalidatePath("/admin/blogs");
}
