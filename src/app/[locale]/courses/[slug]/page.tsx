import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses, localizedCourse, type Locale } from "@/lib/mock-data";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({
  params,
}: PageProps<"/[locale]/courses/[slug]">) {
  const { locale, slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  const t = await getTranslations("Courses");

  if (!course) {
    notFound();
  }

  const localized = localizedCourse(course, locale as Locale);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
        &larr; {t("backToCourses")}
      </Link>
      <div className="mt-6 flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{localized.title}</h1>
        <Badge variant="secondary">{localized.level}</Badge>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">{localized.description}</p>
      <div className="mt-8 flex items-center justify-between rounded-lg border bg-muted/30 p-6">
        <span className="text-xl font-semibold">
          {t("priceLabel")}: ${localized.price}
        </span>
        <Button disabled title={t("paymentComingSoon")}>
          {t("enrollCta")}
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{t("paymentComingSoon")}</p>
    </main>
  );
}
