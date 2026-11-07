import { notFound } from "next/navigation";
import { EditorialPage, getRedesignPage } from "@/components/redesign-site";
import { listPublishedCourses } from "@/lib/db/courses";

export const dynamic = "force-dynamic";

export default async function RedesignPage({ params }: { params: Promise<{ locale: string; path: string[] }> }) {
  const { locale: rawLocale, path } = await params;
  const route = getRedesignPage(path);
  if (!route) notFound();
  const locale = rawLocale === "zh-hans" ? "zh-hans" : "en";
  const courses = route.page === "events" ? await listPublishedCourses() : [];
  return <EditorialPage page={route.page} locale={locale} courses={courses} slug={route.slug} />;
}
