import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/db/courses";
import { localizeCourse } from "@/lib/localize-content";
import type { Locale } from "@/i18n/routing";

export default async function CourseDetailPage({
  params,
}: PageProps<"/[locale]/courses/[slug]">) {
  const { locale, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const course = await getCourseBySlug(decodedSlug);
  const t = await getTranslations("Courses");

  if (!course) {
    notFound();
  }

  const localized = localizeCourse(course, locale as Locale);

  if (!localized) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
        <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
          &larr; {t("backToCourses")}
        </Link>
        <p className="mt-6 text-muted-foreground">{t("noEnglishNotice")}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
        &larr; {t("backToCourses")}
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
      <div className="mt-6 flex items-center gap-3">
        <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">{localized.title}</h1>
        {localized.level && <Badge variant="secondary">{localized.level}</Badge>}
      </div>
      {localized.description && <p className="mt-4 text-lg text-muted-foreground">{localized.description}</p>}
      {localized.whatYoullLearn && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight lg:text-2xl">{t("whatYoullLearn")}</h2>
          <p className="mt-2 text-muted-foreground">{localized.whatYoullLearn}</p>
        </div>
      )}
      <div className="mt-8 flex items-center justify-between rounded-lg border bg-muted/30 p-6">
        <div className="flex items-baseline gap-2">
          {localized.compareAtPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${localized.compareAtPrice.toFixed(2)}
            </span>
          )}
          <span className="text-xl font-semibold">${localized.price.toFixed(2)}</span>
        </div>
        <Button disabled title={t("paymentComingSoon")}>
          {t("enrollCta")}
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{t("paymentComingSoon")}</p>
    </main>
  );
}
