import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/db/courses";
import { localizeCourse } from "@/lib/localize-content";
import { formatMoney } from "@/lib/money";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

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
      <main className="editorial-main mx-auto w-full max-w-3xl flex-1 px-4 py-16">
        <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
          &larr; {t("backToCourses")}
        </Link>
        <p className="mt-6 text-muted-foreground">{t("noEnglishNotice")}</p>
      </main>
    );
  }

  return (
    <main className="editorial-main course-detail mx-auto w-full max-w-5xl flex-1 px-4 py-16">
      <Link href="/courses" className="editorial-back-link">
        &larr; {t("backToCourses")}
      </Link>
      {localized.image && (
        <Image
          src={localized.image}
          alt=""
          width={800}
          height={450}
          className="course-detail-image mt-6 w-full object-cover"
        />
      )}
      <div className="course-detail-copy mt-8">
        <p className="editorial-eyebrow">{localized.level || "SOUL GOOD COURSE"}</p>
        <h1 className="editorial-title">{localized.title}</h1>
        {localized.description && <p className="course-description">{localized.description}</p>}
        {localized.whatYoullLearn && <div className="course-learning"><h2>{t("whatYoullLearn")}</h2><p>{localized.whatYoullLearn}</p></div>}
        <div className="course-purchase-panel"><div className="flex items-baseline gap-3">
          {localized.compareAtPrice && <span className="course-old-price">{formatMoney(localized.compareAtPrice, "CAD", locale as Locale)}</span>}
          <span className="course-price">{formatMoney(localized.price, "CAD", locale as Locale)}</span>
        </div>
        <Button disabled title={t("paymentComingSoon")}>{t("enrollCta")}</Button></div>
        <p className="course-payment-note">{t("paymentComingSoon")}</p>
      </div>
    </main>
  );
}
