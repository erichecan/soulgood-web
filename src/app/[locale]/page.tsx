import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses, blogPosts, localizedCourse, localizedBlogPost, type Locale } from "@/lib/mock-data";
import { PartnersGrid } from "@/components/partners-grid";

export default function HomePage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home");
  const coursesT = useTranslations("Courses");
  const blogsT = useTranslations("Blogs");

  const featuredCourses = courses.slice(0, 3).map((c) => localizedCourse(c, locale));
  const latestPosts = blogPosts.slice(0, 3).map((p) => localizedBlogPost(p, locale));

  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            {t("heroEyebrow")}
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">{t("heroSubtitle")}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/courses">{t("heroCta")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/membership-pricing">{t("heroSecondaryCta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">{t("coursesSectionTitle")}</h2>
          <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
            {t("coursesSectionCta")}
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <Card key={course.slug}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {coursesT("priceLabel")}: ${course.price}
                  </span>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {coursesT("enrollCta")}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="mb-2">
            <h2 className="text-2xl font-semibold tracking-tight">{t("blogsSectionTitle")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("blogsSectionSubtitle")}</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Card key={post.slug}>
                <CardHeader>
                  <CardTitle className="text-base">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    {blogsT("readMore")}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blogs" className="text-sm font-medium text-primary hover:underline">
              {t("blogsSectionCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight">
          {t("partnersSectionTitle")}
        </h2>
        <PartnersGrid />
      </section>
    </main>
  );
}
