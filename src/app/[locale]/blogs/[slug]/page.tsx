import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPostBySlug } from "@/lib/db/blogs";
import { localizeBlogPost } from "@/lib/localize-content";
import type { Locale } from "@/i18n/routing";

export default async function BlogDetailPage({
  params,
}: PageProps<"/[locale]/blogs/[slug]">) {
  const { locale, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getBlogPostBySlug(decodedSlug);
  const t = await getTranslations("Blogs");

  if (!post) {
    notFound();
  }

  const localized = localizeBlogPost(post, locale as Locale);

  if (!localized) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
        <Link href="/blogs" className="text-sm font-medium text-primary hover:underline">
          &larr; {t("backToBlogs")}
        </Link>
        <p className="mt-6 text-muted-foreground">{t("notFound")}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <Link href="/blogs" className="text-sm font-medium text-primary hover:underline">
        &larr; {t("backToBlogs")}
      </Link>
      {localized.image && (
        <Image
          src={localized.image}
          alt=""
          width={800}
          height={450}
          className="mt-6 w-full rounded-lg object-cover"
        />
      )}
      <h1 className="mt-6 text-4xl font-semibold tracking-tight lg:text-5xl">{localized.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("byLabel")} {localized.author} &middot; {localized.publishedAt}
      </p>
      <div className="mt-8 space-y-4 text-lg text-muted-foreground">
        {localized.content.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
