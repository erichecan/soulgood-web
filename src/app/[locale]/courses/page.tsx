import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses, localizedCourse, type Locale } from "@/lib/mock-data";

export default function CoursesPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Courses");
  const list = courses.map((c) => localizedCourse(c, locale)).filter((c) => c !== null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((course) => (
          <Link key={course.slug} href={`/courses/${encodeURIComponent(course.slug)}`}>
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
              <Image src={course.image} alt="" width={400} height={260} className="h-40 w-full object-cover" />
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
    </main>
  );
}
