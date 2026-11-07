import { listPublishedCourses } from "@/lib/db/courses";
import { HomeRedesign } from "@/components/redesign-site";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const courses = await listPublishedCourses();
  return <HomeRedesign locale={locale === "zh-hans" ? "zh-hans" : "en"} courses={courses} />;
}
