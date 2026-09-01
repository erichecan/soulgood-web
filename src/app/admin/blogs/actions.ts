"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import { createBlogPost, deleteBlogPost, updateBlogPost, type BlogPostInput } from "@/lib/db/blogs";

function parseBlogInput(formData: FormData): BlogPostInput {
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    titleEn: String(formData.get("titleEn") ?? "").trim() || null,
    titleZh: String(formData.get("titleZh") ?? "").trim() || null,
    contentEn: String(formData.get("contentEn") ?? "").trim() || null,
    contentZh: String(formData.get("contentZh") ?? "").trim() || null,
    coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim() || null,
    author: String(formData.get("author") ?? "").trim() || null,
    publishedAt: publishedAt ? new Date(publishedAt) : null,
  };
}

function revalidatePublicPages(slug: string) {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/blogs", "page");
  revalidatePath(`/[locale]/blogs/${slug}`, "page");
}

export async function createBlogPostAction(formData: FormData) {
  await requireAdmin();
  const input = parseBlogInput(formData);
  await createBlogPost(input);
  revalidatePath("/admin/blogs");
  revalidatePublicPages(input.slug);
  redirect("/admin/blogs");
}

export async function updateBlogPostAction(id: string, formData: FormData) {
  await requireAdmin();
  const input = parseBlogInput(formData);
  await updateBlogPost(id, input);
  revalidatePath("/admin/blogs");
  revalidatePublicPages(input.slug);
  redirect("/admin/blogs");
}

export async function deleteBlogPostAction(id: string) {
  await requireAdmin();
  await deleteBlogPost(id);
  revalidatePath("/admin/blogs");
  revalidatePath("/[locale]/blogs", "page");
}
