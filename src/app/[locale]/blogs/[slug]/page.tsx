import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts, localizedBlogPost, type Locale } from "@/lib/mock-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({
  params,
}: PageProps<"/[locale]/blogs/[slug]">) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const t = await getTranslations("Blogs");

  if (!post) {
    notFound();
  }

  const localized = localizedBlogPost(post, locale as Locale);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <Link href="/blogs" className="text-sm font-medium text-primary hover:underline">
        &larr; {t("backToBlogs")}
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{localized.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("byLabel")} {localized.author} &middot; {localized.publishedAt}
      </p>
      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>{localized.content}</p>
      </div>
    </main>
  );
}
