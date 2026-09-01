import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listPublishedBlogPosts } from "@/lib/db/blogs";
import { localizeBlogPost } from "@/lib/localize-content";
import type { Locale } from "@/i18n/routing";

export default async function BlogsPage({ params }: PageProps<"/[locale]/blogs">) {
  const { locale } = await params;
  const t = await getTranslations("Blogs");
  const posts = await listPublishedBlogPosts();
  const list = posts.map((p) => localizeBlogPost(p, locale as Locale)).filter((p) => p !== null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((post) => (
          <Link key={post.slug} href={`/blogs/${encodeURIComponent(post.slug)}`}>
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
              {post.image && (
                <Image src={post.image} alt="" width={400} height={220} className="h-36 w-full object-cover" />
              )}
              <CardHeader>
                <CardTitle className="text-base">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {t("byLabel")} {post.author} &middot; {post.publishedAt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
