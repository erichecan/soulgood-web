import { listPublishedCourses } from "@/lib/db/courses";
import { HomeRedesign } from "@/components/redesign-site";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  let courses: Awaited<ReturnType<typeof listPublishedCourses>> = [];
  try {
    courses = await listPublishedCourses();
  } catch (error) {
    if (process.env.NODE_ENV !== "development") throw error;
    console.warn("Home preview is rendering without courses because the local database is unavailable.", error);
  }
  return <HomeRedesign locale={locale === "zh-hans" ? "zh-hans" : "en"} courses={courses} />;
}
