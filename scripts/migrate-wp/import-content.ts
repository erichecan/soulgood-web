/**
 * Imports courses + blog posts from the WP export into the local Postgres
 * dev DB. Safe to re-run (upserts by slug).
 *
 * Usage:
 *   npx tsx scripts/migrate-wp/import-content.ts            # dry run (prints only)
 *   npx tsx scripts/migrate-wp/import-content.ts --commit    # writes to Postgres
 */
import "dotenv/config";
import { prisma } from "../../src/lib/db/prisma";
import { transformBlogPosts, transformCourses } from "./transform";

const isCommit = process.argv.includes("--commit");

async function main() {
  const courses = transformCourses();
  const blogPosts = transformBlogPosts();

  console.log(`Courses to import: ${courses.length}`);
  for (const c of courses) {
    console.log(
      `  - [${c.slug}] EN="${c.titleEn ?? "(none)"}" ZH="${c.titleZh ?? "(none)"}" price=$${c.price}${
        c.compareAtPrice ? ` (was $${c.compareAtPrice})` : ""
      } wpIds=${c.sourceWpIds.join(",")}`,
    );
  }

  console.log(`\nBlog posts to import: ${blogPosts.length}`);
  for (const b of blogPosts) {
    console.log(
      `  - [${b.slug}] EN="${b.titleEn ?? "(none)"}" ZH="${b.titleZh ?? "(none)"}" author=${b.author ?? "-"} wpIds=${b.sourceWpIds.join(",")}`,
    );
  }

  if (!isCommit) {
    console.log("\nDry run only — no changes written. Re-run with --commit to import.");
    return;
  }

  for (const c of courses) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        titleEn: c.titleEn,
        titleZh: c.titleZh,
        descriptionEn: c.descriptionEn,
        descriptionZh: c.descriptionZh,
        whatYoullLearnEn: c.whatYoullLearnEn,
        whatYoullLearnZh: c.whatYoullLearnZh,
        price: c.price,
        compareAtPrice: c.compareAtPrice,
        level: c.level,
        thumbnailUrl: c.thumbnailUrl,
        publishedAt: c.publishedAt,
      },
      update: {
        titleEn: c.titleEn,
        titleZh: c.titleZh,
        descriptionEn: c.descriptionEn,
        descriptionZh: c.descriptionZh,
        whatYoullLearnEn: c.whatYoullLearnEn,
        whatYoullLearnZh: c.whatYoullLearnZh,
        price: c.price,
        compareAtPrice: c.compareAtPrice,
        level: c.level,
        thumbnailUrl: c.thumbnailUrl,
        publishedAt: c.publishedAt,
      },
    });
  }

  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      create: {
        slug: b.slug,
        titleEn: b.titleEn,
        titleZh: b.titleZh,
        contentEn: b.contentEn,
        contentZh: b.contentZh,
        coverImageUrl: b.coverImageUrl,
        author: b.author,
        publishedAt: b.publishedAt,
      },
      update: {
        titleEn: b.titleEn,
        titleZh: b.titleZh,
        contentEn: b.contentEn,
        contentZh: b.contentZh,
        coverImageUrl: b.coverImageUrl,
        author: b.author,
        publishedAt: b.publishedAt,
      },
    });
  }

  console.log(`\nImported ${courses.length} courses and ${blogPosts.length} blog posts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
