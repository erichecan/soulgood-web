import { prisma } from "@/lib/db/prisma";

export function listBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export function listPublishedBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
}

export function getBlogPost(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export type BlogPostInput = {
  slug: string;
  titleEn: string | null;
  titleZh: string | null;
  contentEn: string | null;
  contentZh: string | null;
  coverImageUrl: string | null;
  author: string | null;
  publishedAt: Date | null;
};

export function createBlogPost(input: BlogPostInput) {
  return prisma.blogPost.create({ data: input });
}

export function updateBlogPost(id: string, input: BlogPostInput) {
  return prisma.blogPost.update({ where: { id }, data: input });
}

export function deleteBlogPost(id: string) {
  return prisma.blogPost.delete({ where: { id } });
}
