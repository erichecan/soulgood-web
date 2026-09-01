import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses, localizedCourse, type Locale } from "@/lib/mock-data";

export default function CoursesPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Courses");
  const list = courses.map((c) => localizedCourse(c, locale));

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((course) => (
          <Link key={course.slug} href={`/courses/${course.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{course.title}</CardTitle>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <p className="mt-4 text-sm font-medium">
                  {t("priceLabel")}: ${course.price}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
