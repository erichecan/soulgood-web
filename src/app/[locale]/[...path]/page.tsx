import { notFound } from "next/navigation";
import { EditorialPage, getRedesignPage } from "@/components/redesign-site";
import { listPublishedCourses } from "@/lib/db/courses";
import type { Course } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function RedesignPage({ params }: { params: Promise<{ locale: string; path: string[] }> }) {
  const { locale: rawLocale, path } = await params;
  const route = getRedesignPage(path);
  if (!route) notFound();
  const locale = rawLocale === "zh-hans" ? "zh-hans" : "en";
  let courses: Course[] = [];
  if (route.page === "events") {
    try {
      courses = await listPublishedCourses();
    } catch (error) {
      if (process.env.NODE_ENV !== "development") throw error;
      console.warn("Using the events design preview without the course database.", error);
    }
  }
  return <EditorialPage page={route.page} locale={locale} courses={courses} slug={route.slug} />;
}
