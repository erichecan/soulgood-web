import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts, localizedBlogPost, type Locale } from "@/lib/mock-data";

export default function BlogsPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Blogs");
  const list = blogPosts.map((p) => localizedBlogPost(p, locale)).filter((p) => p !== null);

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
