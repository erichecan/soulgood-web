import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listPublishedCourses } from "@/lib/db/courses";
import { localizeCourse } from "@/lib/localize-content";
import type { Locale } from "@/i18n/routing";

export default async function CoursesPage({ params }: PageProps<"/[locale]/courses">) {
  const { locale } = await params;
  const t = await getTranslations("Courses");
  const courses = await listPublishedCourses();
  const list = courses.map((c) => localizeCourse(c, locale as Locale)).filter((c) => c !== null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
      <h1 className="text-4xl font-semibold tracking-tight lg:text-[68px]">{t("title")}</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((course) => (
          <Link key={course.slug} href={`/courses/${encodeURIComponent(course.slug)}`}>
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
              {course.image && (
                <Image src={course.image} alt="" width={400} height={260} className="h-40 w-full object-cover" />
              )}
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-2xl lg:text-3xl">{course.title}</CardTitle>
                  {course.level && <Badge variant="secondary">{course.level}</Badge>}
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
