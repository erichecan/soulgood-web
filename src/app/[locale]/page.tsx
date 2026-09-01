import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses, blogPosts, localizedCourse, localizedBlogPost, type Locale } from "@/lib/mock-data";
import { PartnersGrid, PartnersContact } from "@/components/partners-grid";

export default function HomePage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home");
  const aboutT = useTranslations("About");
  const coursesT = useTranslations("Courses");
  const blogsT = useTranslations("Blogs");

  const localizedCourses = courses.map((c) => localizedCourse(c, locale)).filter((c) => c !== null);
  const localizedPosts = blogPosts.map((p) => localizedBlogPost(p, locale)).filter((p) => p !== null);

  const missionCards = [
    { image: "/migrated/about/our-mission.webp", title: aboutT("missionTitle"), body: aboutT("missionBody") },
    { image: "/migrated/about/our-objective.webp", title: aboutT("objectiveTitle"), body: aboutT("objectiveBody") },
    { image: "/migrated/about/our-vision.webp", title: aboutT("visionTitle"), body: aboutT("visionBody") },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex min-h-[420px] items-center border-b">
        <Image
          src="/migrated/about/hero-section.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl justify-end px-4">
          <div className="max-w-sm rounded-lg bg-background/95 p-8 shadow-lg">
            <h1 className="text-2xl font-semibold tracking-tight">{t("heroTitle")}</h1>
            <Link
              href="/courses"
              className="mt-4 inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {t("heroCta")} &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("tagline")}</h2>
        <p className="mt-4 text-muted-foreground">
          {t("taglineSubtitleLine1")}
          {t("taglineSubtitleLine2") && (
            <>
              <br />
              {t("taglineSubtitleLine2")}
            </>
          )}
        </p>
        <Image
          src="/migrated/about/happy-work-healthy-life.png"
          alt=""
          width={740}
          height={495}
          className="mx-auto mt-8 w-full max-w-2xl rounded-lg"
        />
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            {t("missionSectionTitle")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {missionCards.map((card) => (
              <Card key={card.title} className="overflow-hidden">
                <Image src={card.image} alt="" width={400} height={300} className="w-full object-cover" />
                <CardHeader>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight">{t("introTitle")}</h2>
        <div className="mt-8 aspect-video overflow-hidden rounded-lg border">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/kEn_NWK3d58"
            title="慧之灵 女性成长俱乐部"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            {t("coursesSectionTitle")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localizedCourses.map((course) => (
              <Link key={course.slug} href={`/courses/${encodeURIComponent(course.slug)}`}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                  <Image
                    src={course.image}
                    alt=""
                    width={400}
                    height={260}
                    className="h-40 w-full object-cover"
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      {course.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${course.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="font-medium">${course.price.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
              {t("coursesSectionCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight">{t("blogsSectionTitle")}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localizedPosts.slice(0, 3).map((post) => (
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
                    {blogsT("byLabel")} {post.author} &middot; {post.publishedAt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/blogs" className="text-sm font-medium text-primary hover:underline">
            {t("blogsSectionCta")}
          </Link>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            {t("partnersSectionTitle")}
          </h2>
          <div className="mt-10">
            <PartnersGrid />
          </div>
          <PartnersContact />
        </div>
      </section>
    </main>
  );
}
