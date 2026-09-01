import type { BlogPost, Course } from "@/generated/prisma/client";
import type { Locale } from "@/i18n/routing";

/** Returns null when the course has no title in the requested locale,
 * rather than inventing a translation — matches the source site, where
 * several courses/posts are published in only one language. */
export function localizeCourse(course: Course, locale: Locale) {
  const title = locale === "zh-hans" ? course.titleZh : course.titleEn;
  if (!title) return null;
  return {
    slug: course.slug,
    title,
    description: (locale === "zh-hans" ? course.descriptionZh : course.descriptionEn) ?? "",
    whatYoullLearn: (locale === "zh-hans" ? course.whatYoullLearnZh : course.whatYoullLearnEn) ?? "",
    level: course.level ?? "",
    price: course.price.toNumber(),
    compareAtPrice: course.compareAtPrice ? course.compareAtPrice.toNumber() : undefined,
    image: course.thumbnailUrl ?? "",
  };
}

export function localizeBlogPost(post: BlogPost, locale: Locale) {
  const title = locale === "zh-hans" ? post.titleZh : post.titleEn;
  if (!title) return null;
  return {
    slug: post.slug,
    title,
    content: (locale === "zh-hans" ? post.contentZh : post.contentEn) ?? "",
    author: post.author ?? "",
    publishedAt: post.publishedAt ? post.publishedAt.toISOString().slice(0, 10) : "",
    image: post.coverImageUrl ?? undefined,
  };
}
