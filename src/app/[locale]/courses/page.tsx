import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { listPublishedCourses } from "@/lib/db/courses";
import { localizeCourse } from "@/lib/localize-content";
import { formatMoney } from "@/lib/money";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export default async function CoursesPage({ params }: PageProps<"/[locale]/courses">) {
  const { locale } = await params;
  const t = await getTranslations("Courses");
  const courses = await listPublishedCourses();
  const list = courses.map((course) => localizeCourse(course, locale as Locale)).filter((course) => course !== null);
  const title = locale === "zh-hans" ? "为自己留一点学习时间。" : "Make room to learn something good.";
  const intro = locale === "zh-hans" ? "在 Soul Good 的课程中学习、练习，也与彼此建立连接。" : "Learn, practise and connect with others through Soul Good courses.";

  return (
    <main className="editorial-main">
      <section className="editorial-legal-hero"><p className="editorial-eyebrow">SOUL GOOD · LEARNING TOGETHER</p><h1 className="editorial-title">{title}</h1><p>{intro}</p></section>
      <section className="editorial-content">
        {list.length ? <div className="editorial-course-grid">{list.map((course) => <Link className="editorial-course" href={`/courses/${encodeURIComponent(course.slug)}`} key={course.slug}>
          {course.image && <Image src={course.image} alt={course.title} width={700} height={480} />}
          <div className="course-copy"><p className="editorial-eyebrow">{course.level || "SOUL GOOD COURSE"}</p><h2>{course.title}</h2><p>{course.description}</p><strong>{formatMoney(course.price, "CAD", locale as Locale)}</strong></div><span className="course-link">{locale === "zh-hans" ? "查看课程" : "View course"} ↗</span>
        </Link>)}</div> : <p className="editorial-callout">{locale === "zh-hans" ? "新课程正在准备中，欢迎稍后再来。" : "New courses are being prepared. Please check back soon."}</p>}
      </section>
    </main>
  );
}
